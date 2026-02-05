/**
 * @dynamic-canvas/react
 * A modular, reusable dynamic canvas component for React
 */

export { CanvasProvider, useCanvas, useCanvasContent, useCanvasLayout } from './core/CanvasContext';
export { CanvasContainer, CanvasHeader, CanvasContent, CanvasToolbar } from './core/CanvasContainer';
export { ChartRenderer, TimelineRenderer, CodeRenderer, DocumentRenderer, CustomRenderer } from './renderers';
export { defaultTheme, lightTheme, darkTheme } from './themes';
export type { Theme } from './themes';
export { ContentAnalyzer } from './utils/contentAnalyzer';
export * from './types';
