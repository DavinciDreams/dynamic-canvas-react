import { default as default_2 } from 'react';
import { ReactNode } from 'react';

export declare type ArtifactFormat = 'json' | 'csv' | 'txt' | 'html' | 'pdf';

export declare interface CanvasConfig {
    layout?: 'side-by-side' | 'stacked' | 'fullscreen';
    widthRatio?: number;
    theme?: Theme;
    themeMode?: 'light' | 'dark' | 'system';
    autoDetectType?: boolean;
    onContentChange?: (content: CanvasContent_2) => void;
    onDownload?: (content: CanvasContent_2, format: string) => void;
    onRendererError?: (error: Error, type: string) => void;
    rendererProps?: Record<string, any>;
}

export declare const CanvasContainer: default_2.FC<CanvasContainerProps>;

declare interface CanvasContainerProps {
    children: ReactNode;
    theme: Theme;
    className?: string;
}

export declare const CanvasContent: default_2.FC<{
    children: ReactNode;
    theme: Theme;
}>;

declare interface CanvasContent_2 {
    type: CanvasContentType;
    data: any;
    title?: string;
    description?: string;
    metadata?: Record<string, any>;
}

/**
 * Core type definitions for the Dynamic Canvas library
 */
export declare type CanvasContentType = 'chart' | 'timeline' | 'code' | 'document' | 'custom';

export declare type CanvasContentUnion = ChartContent | TimelineContent | CodeContent | DocumentContent | CustomContent;

export declare interface CanvasEvent {
    type: 'contentChange' | 'download' | 'error';
    content?: CanvasContent_2;
    format?: string;
    error?: Error;
}

export declare const CanvasHeader: default_2.FC<{
    title?: string;
    description?: string;
    theme: Theme;
}>;

export declare const CanvasProvider: default_2.FC<CanvasProviderProps>;

declare interface CanvasProviderProps {
    children: ReactNode;
    initialTheme?: Theme;
    initialThemeMode?: 'light' | 'dark' | 'system';
    initialContent?: CanvasContent_2;
}

export declare const CanvasToolbar: default_2.FC<{
    children: ReactNode;
    theme: Theme;
}>;

export declare interface ChartContent extends CanvasContent_2 {
    type: 'chart';
    chartType: ChartOptions['chartType'];
    data: ChartData;
    options?: ChartOptions;
}

export declare interface ChartData {
    labels: string[];
    values: number[];
    series?: Array<{
        name: string;
        data: number[];
    }>;
}

export declare interface ChartOptions {
    chartType?: 'bar' | 'line' | 'scatter' | 'pie' | 'custom';
    colors?: string[];
    title?: string;
    xAxisLabel?: string;
    yAxisLabel?: string;
    showLegend?: boolean;
}

export declare const ChartRenderer: default_2.FC<ChartRendererProps>;

declare interface ChartRendererProps {
    content: ChartContent;
    theme: Theme;
}

export declare interface CodeContent extends CanvasContent_2 {
    type: 'code';
    code: string;
    language: string;
    filename?: string;
    showLineNumbers?: boolean;
    showCopyButton?: boolean;
}

export declare const CodeRenderer: default_2.FC<CodeRendererProps>;

declare interface CodeRendererProps {
    content: CodeContent;
    theme: Theme;
}

export declare class ContentAnalyzer {
    /**
     * Detect the content type from a string
     */
    static detectType(content: string): CanvasContentType;
    /**
     * Extract chart data from content
     */
    static extractChartData(content: string): {
        labels: number[];
        values: number[];
    } | null;
    /**
     * Extract timeline events from content
     */
    static extractTimelineEvents(content: string): any[] | null;
    /**
     * Extract code from content
     */
    static extractCode(content: string): {
        code: string;
        language: string;
    } | null;
    /**
     * Analyze content and return appropriate content object
     */
    static analyze(content: string): any;
}

export declare interface CustomContent extends CanvasContent_2 {
    type: 'custom';
    component?: React.ComponentType<any>;
    props?: Record<string, any>;
}

export declare const CustomRenderer: default_2.FC<CustomRendererProps>;

declare interface CustomRendererProps {
    content: CustomContent;
    theme: Theme;
}

export declare const darkTheme: Theme;

export declare const defaultTheme: Theme;

export declare interface DocumentContent extends CanvasContent_2 {
    type: 'document';
    content: string;
    format: 'markdown' | 'html' | 'pdf';
    title?: string;
}

export declare const DocumentRenderer: default_2.FC<DocumentRendererProps>;

declare interface DocumentRendererProps {
    content: DocumentContent;
    theme: Theme;
}

export declare interface DownloadOptions {
    format: ArtifactFormat;
    filename?: string;
    includeMetadata?: boolean;
}

export declare interface LayoutConfig {
    layout: 'side-by-side' | 'stacked' | 'fullscreen';
    widthRatio: number;
    isMobile: boolean;
    isTablet: boolean;
    isDesktop: boolean;
}

export declare const lightTheme: Theme;

export declare interface Theme {
    colors: ThemeColors;
    spacing: ThemeSpacing;
    typography: ThemeTypography;
    borderRadius: ThemeBorderRadius;
    shadows: ThemeShadows;
}

export declare interface ThemeBorderRadius {
    sm: string;
    md: string;
    lg: string;
    xl: string;
}

export declare interface ThemeColors {
    background: string;
    surface: string;
    primary: string;
    secondary: string;
    text: string;
    muted: string;
    border: string;
    highlight: string;
}

declare interface ThemeContextType {
    theme: Theme;
    setTheme: (theme: Theme) => void;
    themeMode: 'light' | 'dark' | 'system';
    setThemeMode: (mode: 'light' | 'dark' | 'system') => void;
}

export declare interface ThemeShadows {
    sm: string;
    md: string;
    lg: string;
}

export declare interface ThemeSpacing {
    xs: string;
    sm: string;
    md: string;
    lg: string;
    xl: string;
}

export declare interface ThemeTypography {
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

export declare interface TimelineContent extends CanvasContent_2 {
    type: 'timeline';
    events: TimelineEvent[];
    options?: TimelineOptions;
}

export declare interface TimelineEvent {
    date: string;
    title: string;
    description?: string;
    icon?: string;
    link?: string;
}

export declare interface TimelineOptions {
    orientation?: 'horizontal' | 'vertical';
    showDate?: boolean;
    showDescription?: boolean;
    compact?: boolean;
}

export declare const TimelineRenderer: default_2.FC<TimelineRendererProps>;

declare interface TimelineRendererProps {
    content: TimelineContent;
    theme: Theme;
}

export declare const useCanvas: () => ThemeContextType;

export declare const useCanvasContent: () => {
    content: any;
    setContent: any;
};

export declare const useCanvasLayout: () => {
    layout: any;
    widthRatio: any;
    setLayout: any;
    setWidthRatio: any;
};

export { }
