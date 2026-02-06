/**
 * @davincidreams/dynamic-canvas-react
 * A2UI-native dynamic canvas component for React
 */

// === Legacy exports (backward compatible) ===
export { CanvasProvider, useCanvas, useCanvasContent, useCanvasLayout } from './core/CanvasContext';
export { CanvasContainer, CanvasHeader, CanvasContent, CanvasToolbar } from './core/CanvasContainer';
export { ChartRenderer, TimelineRenderer, CodeRenderer, DocumentRenderer, CustomRenderer } from './renderers';
export { defaultTheme, lightTheme, darkTheme } from './themes';
export type { Theme } from './themes';
export { ContentAnalyzer, canvasContentToA2UI } from './utils/contentAnalyzer';
export * from './types';

// === A2UI Schema (also available standalone via /schema) ===
export * from './schema';

// === A2UI Core Infrastructure ===
export { createSurfaceManager, type Surface, type SurfaceManagerState, type SurfaceManagerStore } from './core/SurfaceManager';
export { StreamProcessor, type StreamProcessorOptions, type MessageCallback, type ErrorCallback } from './core/StreamProcessor';
export { ComponentRegistry, createDefaultRegistry, type RendererProps } from './core/ComponentRegistry';
export { RendererResolver } from './core/RendererResolver';
export { ErrorBoundary } from './core/ErrorBoundary';

// === A2UI Hooks ===
export { useA2UISurface, type UseA2UISurfaceOptions, type A2UISurfaceResult } from './hooks/useA2UISurface';
export { useStreamingContent, type UseStreamingContentOptions, type StreamingContentResult } from './hooks/useStreamingContent';

// === A2UI Renderers (new) ===
export { default as MediaRenderer } from './renderers/MediaRenderer';
export { default as ArtifactRenderer } from './renderers/ArtifactRenderer';
export { default as KnowledgeGraphRenderer } from './renderers/KnowledgeGraphRenderer';
export { default as MapRenderer } from './renderers/MapRenderer';

// === Shared Renderer Components ===
export { LazyWrapper } from './renderers/shared/LazyWrapper';
export { RendererFrame } from './renderers/shared/RendererFrame';

// === Utilities ===
export { resolvePointer, setPointer, appendAtPointer, parsePointer, escapeToken } from './utils/jsonPointer';
export { debounce, batchCalls } from './utils/streaming';
