/**
 * Dark theme configuration
 */

import type { Theme } from '../types';
import { defaultTheme } from './defaultTheme';

export const darkTheme: Theme = {
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
};
