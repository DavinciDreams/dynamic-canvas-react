/**
 * Light theme configuration
 */

import type { Theme } from '../types';
import { defaultTheme } from './defaultTheme';

export const lightTheme: Theme = {
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
};
