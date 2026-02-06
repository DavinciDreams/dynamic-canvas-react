/**
 * Canvas context — wraps SurfaceManager + preserves legacy hooks
 *
 * Backward-compatible: CanvasProvider, useCanvas, useCanvasContent, useCanvasLayout
 * still work exactly as before. Additionally exposes A2UI surface state.
 */

import React, { createContext, useContext, useState, useEffect, useRef, useMemo, type ReactNode } from 'react';
import type { StoreApi } from 'zustand/vanilla';
import type { Theme, CanvasContent } from '../types';
import { defaultTheme, type ThemeContextType } from '../themes';
import { createSurfaceManager, type SurfaceManagerStore } from './SurfaceManager';
import { createDefaultRegistry, type ComponentRegistry } from './ComponentRegistry';

interface CanvasContextType extends ThemeContextType {
  /** @deprecated Use useA2UISurface() instead */
  content: CanvasContent | null;
  /** @deprecated Use processMessage() instead */
  setCanvasContent: (content: CanvasContent) => void;
  layout: 'side-by-side' | 'stacked' | 'fullscreen';
  setCanvasLayout: (layout: 'side-by-side' | 'stacked' | 'fullscreen') => void;
  widthRatio: number;
  setCanvasWidthRatio: (ratio: number) => void;
  /** A2UI surface store */
  surfaceStore: StoreApi<SurfaceManagerStore>;
  /** Component registry */
  registry: ComponentRegistry;
}

const CanvasContext = createContext<CanvasContextType | undefined>(undefined);

interface CanvasProviderProps {
  children: ReactNode;
  initialTheme?: Theme;
  initialThemeMode?: 'light' | 'dark' | 'system';
  initialContent?: CanvasContent;
  /** Provide an external surface store (for sharing across components) */
  surfaceStore?: StoreApi<SurfaceManagerStore>;
  /** Provide an external component registry */
  registry?: ComponentRegistry;
}

export const CanvasProvider: React.FC<CanvasProviderProps> = ({
  children,
  initialTheme = defaultTheme,
  initialThemeMode = 'light',
  initialContent,
  surfaceStore: externalStore,
  registry: externalRegistry,
}) => {
  const [theme, setTheme] = useState<Theme>(initialTheme);
  const [themeMode, setThemeMode] = useState<'light' | 'dark' | 'system'>(initialThemeMode);
  const [content, setContent] = useState<CanvasContent | null>(initialContent || null);
  const [layout, setLayout] = useState<'side-by-side' | 'stacked' | 'fullscreen'>('side-by-side');
  const [widthRatio, setWidthRatio] = useState(0.4);

  const storeRef = useRef(externalStore ?? createSurfaceManager());
  const registryRef = useRef(externalRegistry ?? createDefaultRegistry());

  // Handle theme mode changes
  useEffect(() => {
    const applyTheme = () => {
      const isDark = themeMode === 'dark' || (themeMode === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches);
      setTheme(isDark ? {
        ...defaultTheme,
        colors: {
          ...defaultTheme.colors,
          background: '#0f172a',
          surface: '#1e293b',
          text: '#f8fafc',
          muted: '#94a3b8',
          border: '#334155',
          highlight: '#1e293b'
        }
      } : {
        ...defaultTheme,
        colors: {
          ...defaultTheme.colors,
          background: '#ffffff',
          surface: '#f8fafc',
          text: '#0f172a',
          muted: '#64748b',
          border: '#e2e8f0',
          highlight: '#f1f5f9'
        }
      });
    };

    applyTheme();

    if (themeMode === 'system') {
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      const handler = () => applyTheme();
      mediaQuery.addEventListener('change', handler);
      return () => mediaQuery.removeEventListener('change', handler);
    }
  }, [themeMode]);

  const setCanvasContent = (newContent: CanvasContent) => {
    setContent(newContent);
  };

  const setCanvasLayout = (newLayout: 'side-by-side' | 'stacked' | 'fullscreen') => {
    setLayout(newLayout);
  };

  const setCanvasWidthRatio = (ratio: number) => {
    setWidthRatio(ratio);
  };

  const value: CanvasContextType = useMemo(() => ({
    theme,
    setTheme,
    themeMode,
    setThemeMode,
    content,
    setCanvasContent,
    layout,
    setCanvasLayout,
    widthRatio,
    setCanvasWidthRatio,
    surfaceStore: storeRef.current,
    registry: registryRef.current,
  }), [theme, themeMode, content, layout, widthRatio]);

  return (
    <CanvasContext.Provider value={value}>
      {children}
    </CanvasContext.Provider>
  );
};

export const useCanvas = () => {
  const context = useContext(CanvasContext);
  if (context === undefined) {
    throw new Error('useCanvas must be used within a CanvasProvider');
  }
  return context;
};

/** @deprecated Use useA2UISurface() instead */
export const useCanvasContent = () => {
  const { content, setCanvasContent } = useCanvas();
  return { content, setContent: setCanvasContent };
};

export const useCanvasLayout = () => {
  const { layout, widthRatio, setCanvasLayout, setCanvasWidthRatio } = useCanvas();
  return { layout, widthRatio, setLayout: setCanvasLayout, setWidthRatio: setCanvasWidthRatio };
};
