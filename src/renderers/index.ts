/**
 * Renderer components exports
 *
 * Named exports for backward compatibility + default exports for lazy loading via ComponentRegistry.
 */

export { ChartRenderer } from './ChartRenderer';
export { TimelineRenderer } from './TimelineRenderer';
export { CodeRenderer } from './CodeRenderer';
export { DocumentRenderer } from './DocumentRenderer';
export { CustomRenderer } from './CustomRenderer';

// New A2UI renderers (default exports used by ComponentRegistry lazy loading)
export { default as MediaRendererDefault } from './MediaRenderer';
export { default as ArtifactRendererDefault } from './ArtifactRenderer';
export { default as KnowledgeGraphRendererDefault } from './KnowledgeGraphRenderer';
export { default as MapRendererDefault } from './MapRenderer';
