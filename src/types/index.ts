/**
 * Core type definitions for the Dynamic Canvas library
 */

// Content types
export type CanvasContentType = 'chart' | 'timeline' | 'code' | 'document' | 'custom';

// Canvas configuration
export interface CanvasConfig {
  layout?: 'side-by-side' | 'stacked' | 'fullscreen';
  widthRatio?: number;
  theme?: Theme;
  themeMode?: 'light' | 'dark' | 'system';
  autoDetectType?: boolean;
  onContentChange?: (content: CanvasContent) => void;
  onDownload?: (content: CanvasContent, format: string) => void;
  onRendererError?: (error: Error, type: string) => void;
  rendererProps?: Record<string, any>;
}

// Base canvas content
export interface CanvasContent {
  type: CanvasContentType;
  data: any;
  title?: string;
  description?: string;
  metadata?: Record<string, any>;
}

// Chart content
export interface ChartData {
  labels: string[];
  values: number[];
  series?: Array<{ name: string; data: number[] }>;
}

export interface ChartOptions {
  chartType?: 'bar' | 'line' | 'scatter' | 'pie' | 'custom';
  colors?: string[];
  title?: string;
  xAxisLabel?: string;
  yAxisLabel?: string;
  showLegend?: boolean;
}

export interface ChartContent extends CanvasContent {
  type: 'chart';
  chartType: ChartOptions['chartType'];
  data: ChartData;
  options?: ChartOptions;
}

// Timeline content
export interface TimelineEvent {
  date: string;
  title: string;
  description?: string;
  icon?: string;
  link?: string;
}

export interface TimelineOptions {
  orientation?: 'horizontal' | 'vertical';
  showDate?: boolean;
  showDescription?: boolean;
  compact?: boolean;
}

export interface TimelineContent extends CanvasContent {
  type: 'timeline';
  events: TimelineEvent[];
  options?: TimelineOptions;
}

// Code content
export interface CodeContent extends CanvasContent {
  type: 'code';
  code: string;
  language: string;
  filename?: string;
  showLineNumbers?: boolean;
  showCopyButton?: boolean;
}

// Document content
export interface DocumentContent extends CanvasContent {
  type: 'document';
  content: string;
  format: 'markdown' | 'html' | 'pdf';
  title?: string;
}

// Custom content
export interface CustomContent extends CanvasContent {
  type: 'custom';
  component?: React.ComponentType<any>;
  props?: Record<string, any>;
}

// Union type for all content types
export type CanvasContentUnion = ChartContent | TimelineContent | CodeContent | DocumentContent | CustomContent;

// Theme types
export interface ThemeColors {
  background: string;
  surface: string;
  primary: string;
  secondary: string;
  text: string;
  muted: string;
  border: string;
  highlight: string;
}

export interface ThemeSpacing {
  xs: string;
  sm: string;
  md: string;
  lg: string;
  xl: string;
}

export interface ThemeTypography {
  font: string;
  sizes: {
    xs: string;
    sm: string;
    md: string;
    lg: string;
    xl: string;
  };
  weights: {
    normal: number;
    medium: number;
    bold: number;
  };
}

export interface ThemeBorderRadius {
  sm: string;
  md: string;
  lg: string;
  xl: string;
}

export interface ThemeShadows {
  sm: string;
  md: string;
  lg: string;
}

export interface Theme {
  colors: ThemeColors;
  spacing: ThemeSpacing;
  typography: ThemeTypography;
  borderRadius: ThemeBorderRadius;
  shadows: ThemeShadows;
}

// Download types
export type ArtifactFormat = 'json' | 'csv' | 'txt' | 'html' | 'pdf';

export interface DownloadOptions {
  format: ArtifactFormat;
  filename?: string;
  includeMetadata?: boolean;
}

// Event types
export interface CanvasEvent {
  type: 'contentChange' | 'download' | 'error';
  content?: CanvasContent;
  format?: string;
  error?: Error;
}

// Layout types
export interface LayoutConfig {
  layout: 'side-by-side' | 'stacked' | 'fullscreen';
  widthRatio: number;
  isMobile: boolean;
  isTablet: boolean;
  isDesktop: boolean;
}
