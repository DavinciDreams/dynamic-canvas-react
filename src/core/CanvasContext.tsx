/**
 * Canvas context for managing canvas state and theme
 */

import React, { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import type { Theme, CanvasContent, CanvasConfig } from '../types';
import { defaultTheme, type ThemeContextType } from '../themes';

const CanvasContext = createContext<ThemeContextType | undefined>(undefined);

interface CanvasProviderProps {
  children: ReactNode;
  initialTheme?: Theme;
  initialThemeMode?: 'light' | 'dark' | 'system';
  initialContent?: CanvasContent;
}

export const CanvasProvider: React.FC<CanvasProviderProps> = ({
  children,
  initialTheme = defaultTheme,
  initialThemeMode = 'light',
  initialContent
}) => {
  const [theme, setTheme] = useState<Theme>(initialTheme);
  const [themeMode, setThemeMode] = useState<'light' | 'dark' | 'system'>(initialThemeMode);
  const [content, setContent] = useState<CanvasContent | null>(initialContent);
  const [layout, setLayout] = useState<'side-by-side' | 'stacked' | 'fullscreen'>('side-by-side');
  const [widthRatio, setWidthRatio] = useState(0.4);

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

  const value: ThemeContextType = {
    theme,
    setTheme,
    themeMode,
    setThemeMode
  };

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

export const useCanvasContent = () => {
  const { content, setCanvasContent } = useCanvas();
  return { content, setContent: setCanvasContent };
};

export const useCanvasLayout = () => {
  const { layout, widthRatio, setCanvasLayout, setCanvasWidthRatio } = useCanvas();
  return { layout, widthRatio, setLayout: setCanvasLayout, setWidthRatio: setCanvasWidthRatio };
};
