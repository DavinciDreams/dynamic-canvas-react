/**
 * CanvasContainer component - Main layout wrapper
 */

import React, { type ReactNode } from 'react';
import type { Theme } from '../types';

interface CanvasContainerProps {
  children: ReactNode;
  theme: Theme;
  className?: string;
}

export const CanvasContainer: React.FC<CanvasContainerProps> = ({
  children,
  theme,
  className = ''
}) => {
  const styles = {
    container: `
      w-full h-full
      bg-[${theme.colors.background}]
      border-[${theme.colors.border}]
      rounded-xl
      overflow-hidden
      ${className}
    `,
    header: `
      px-6 py-4
      border-b-[1px]
      border-[${theme.colors.border}]
      bg-[${theme.colors.surface}]
    `,
    content: `
      flex-1
      overflow-y-auto
      p-6
    `,
    toolbar: `
      flex items-center justify-between
      px-6 py-3
      border-b-[1px]
      border-[${theme.colors.border}]
      bg-[${theme.colors.surface}]
    `
  };

  return (
    <div className={styles.container}>
      {children}
    </div>
  );
};

export const CanvasHeader: React.FC<{ title?: string; description?: string; theme: Theme }> = ({
  title,
  description,
  theme
}) => {
  return (
    <div className={`
      px-6 py-4
      border-b-[1px]
      border-[${theme.colors.border}]
      bg-[${theme.colors.surface}]
    `}>
      {title && (
        <h2 className={`text-xl font-bold text-[${theme.colors.text}] mb-1`}>
          {title}
        </h2>
      )}
      {description && (
        <p className={`text-sm text-[${theme.colors.muted}]`}>
          {description}
        </p>
      )}
    </div>
  );
};

export const CanvasContent: React.FC<{ children: ReactNode; theme: Theme }> = ({
  children,
  theme
}) => {
  return (
    <div className={`
      flex-1
      overflow-y-auto
      p-6
      bg-[${theme.colors.background}]
    `}>
      {children}
    </div>
  );
};

export const CanvasToolbar: React.FC<{ children: ReactNode; theme: Theme }> = ({
  children,
  theme
}) => {
  return (
    <div className={`
      flex items-center justify-between
      px-6 py-3
      border-b-[1px]
      border-[${theme.colors.border}]
      bg-[${theme.colors.surface}]
    `}>
      {children}
    </div>
  );
};
