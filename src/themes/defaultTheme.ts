/**
 * Default theme configuration
 */

import type { Theme } from '../types';

export const defaultTheme: Theme = {
  colors: {
    background: '#ffffff',
    surface: '#f8fafc',
    primary: '#0ea5e9',
    secondary: '#6366f1',
    text: '#0f172a',
    muted: '#64748b',
    border: '#e2e8f0',
    highlight: '#f1f5f9'
  },
  spacing: {
    xs: '4px',
    sm: '8px',
    md: '16px',
    lg: '24px',
    xl: '32px'
  },
  typography: {
    font: 'Inter, system-ui, -apple-system, sans-serif',
    sizes: {
      xs: '12px',
      sm: '14px',
      md: '16px',
      lg: '18px',
      xl: '20px'
    },
    weights: {
      normal: 400,
      medium: 500,
      bold: 700
    }
  },
  borderRadius: {
    sm: '4px',
    md: '8px',
    lg: '12px',
    xl: '16px'
  },
  shadows: {
    sm: '0 1px 2px rgba(0, 0, 0, 0.05)',
    md: '0 4px 6px rgba(0, 0, 0, 0.1)',
    lg: '0 10px 15px rgba(0, 0, 0, 0.1)'
  }
};
