/**
 * Component catalog definition for agent negotiation
 *
 * Agents query the catalog to discover what components are available
 * and what props they accept.
 */

import type { A2UIComponentType } from './component-types';

export interface CatalogComponentField {
  name: string;
  type: 'string' | 'number' | 'boolean' | 'array' | 'object' | 'enum';
  required?: boolean;
  description?: string;
  enumValues?: string[];
  default?: unknown;
}

export interface CatalogComponentDef {
  component: A2UIComponentType;
  description: string;
  fields: CatalogComponentField[];
  /** Optional peer dependencies required for this renderer */
  peerDeps?: string[];
}

export interface ComponentCatalog {
  catalogId: string;
  version: string;
  description: string;
  components: CatalogComponentDef[];
}

/** Built-in catalog for dynamic-canvas/v1 */
export const DYNAMIC_CANVAS_CATALOG: ComponentCatalog = {
  catalogId: 'dynamic-canvas/v1',
  version: '1.0.0',
  description: 'Dynamic Canvas React — A2UI-native visualization components',
  components: [
    {
      component: 'Chart',
      description: 'SVG charts: bar, line, scatter, pie, area, donut, radar, heatmap',
      fields: [
        { name: 'chartType', type: 'enum', required: true, enumValues: ['bar', 'line', 'scatter', 'pie', 'area', 'donut', 'radar', 'heatmap'] },
        { name: 'data', type: 'string', required: true, description: 'JSON Pointer to data array' },
        { name: 'title', type: 'string' },
        { name: 'xAxis', type: 'object' },
        { name: 'yAxis', type: 'object' },
        { name: 'colors', type: 'array' },
        { name: 'series', type: 'array' },
        { name: 'threeD', type: 'boolean', default: false },
        { name: 'showLegend', type: 'boolean', default: true },
      ],
      peerDeps: ['d3'],
    },
    {
      component: 'Timeline',
      description: 'Rich timeline with alternating, grouped, and zoomable layouts',
      fields: [
        { name: 'events', type: 'string', required: true, description: 'JSON Pointer to events array' },
        { name: 'title', type: 'string' },
        { name: 'orientation', type: 'enum', enumValues: ['horizontal', 'vertical'], default: 'vertical' },
        { name: 'layout', type: 'enum', enumValues: ['default', 'alternating', 'grouped'], default: 'default' },
        { name: 'groupBy', type: 'string' },
        { name: 'zoomable', type: 'boolean', default: false },
      ],
    },
    {
      component: 'KnowledgeGraph',
      description: 'Force-directed knowledge graph (2D default, optional 3D)',
      fields: [
        { name: 'nodes', type: 'string', required: true, description: 'JSON Pointer to nodes array' },
        { name: 'edges', type: 'string', required: true, description: 'JSON Pointer to edges array' },
        { name: 'title', type: 'string' },
        { name: 'layout', type: 'enum', enumValues: ['force', 'radial', 'hierarchical'], default: 'force' },
        { name: 'threeD', type: 'boolean', default: false },
        { name: 'directed', type: 'boolean', default: false },
      ],
      peerDeps: ['react-force-graph-2d'],
    },
    {
      component: 'Map',
      description: 'Globe/map with markers (Cesium-based, lazy-loaded)',
      fields: [
        { name: 'center', type: 'object' },
        { name: 'zoom', type: 'number', default: 2 },
        { name: 'markers', type: 'string', description: 'JSON Pointer to markers array' },
        { name: 'title', type: 'string' },
        { name: 'baseLayer', type: 'enum', enumValues: ['satellite', 'terrain', 'streets', 'dark'], default: 'streets' },
        { name: 'terrain', type: 'boolean', default: false },
      ],
      peerDeps: ['@cesium/engine', 'resium'],
    },
    {
      component: 'Media',
      description: 'Native image, video, and audio elements',
      fields: [
        { name: 'mediaType', type: 'enum', required: true, enumValues: ['image', 'video', 'audio'] },
        { name: 'src', type: 'string', required: true },
        { name: 'alt', type: 'string' },
        { name: 'caption', type: 'string' },
        { name: 'controls', type: 'boolean', default: true },
        { name: 'fit', type: 'enum', enumValues: ['contain', 'cover', 'fill', 'none', 'scale-down'], default: 'contain' },
      ],
    },
    {
      component: 'Document',
      description: 'Markdown or HTML document with optional table of contents',
      fields: [
        { name: 'content', type: 'string', required: true },
        { name: 'title', type: 'string' },
        { name: 'format', type: 'enum', enumValues: ['markdown', 'html'], default: 'markdown' },
        { name: 'toc', type: 'boolean', default: false },
      ],
      peerDeps: ['react-markdown', 'remark-gfm'],
    },
    {
      component: 'Code',
      description: 'Syntax-highlighted code block with shiki',
      fields: [
        { name: 'code', type: 'string', required: true },
        { name: 'language', type: 'string', default: 'text' },
        { name: 'filename', type: 'string' },
        { name: 'highlightLines', type: 'array' },
        { name: 'showLineNumbers', type: 'boolean', default: true },
        { name: 'showCopyButton', type: 'boolean', default: true },
      ],
      peerDeps: ['shiki'],
    },
    {
      component: 'Artifact',
      description: 'Sandboxed HTML/CSS/JS iframe',
      fields: [
        { name: 'html', type: 'string' },
        { name: 'css', type: 'string' },
        { name: 'js', type: 'string' },
        { name: 'title', type: 'string' },
        { name: 'sandboxPermissions', type: 'array' },
      ],
    },
    {
      component: 'Custom',
      description: 'Client-side registry key escape hatch',
      fields: [
        { name: 'rendererKey', type: 'string', required: true },
        { name: 'title', type: 'string' },
        { name: 'props', type: 'object' },
      ],
    },
  ],
};
