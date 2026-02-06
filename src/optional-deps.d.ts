/**
 * Type declarations for optional peer dependencies
 * These modules may not be installed — they are dynamically imported at runtime.
 */

declare module 'd3' {
  const d3: any;
  export = d3;
  export default d3;
}

declare module 'shiki' {
  export function createHighlighter(opts: any): Promise<any>;
}

declare module 'react-markdown' {
  import type { ComponentType } from 'react';
  const ReactMarkdown: ComponentType<{ children: string; remarkPlugins?: any[] }>;
  export default ReactMarkdown;
}

declare module 'remark-gfm' {
  const remarkGfm: any;
  export default remarkGfm;
}

declare module 'react-force-graph-2d' {
  import type { ComponentType } from 'react';
  const ForceGraph2D: ComponentType<any>;
  export default ForceGraph2D;
}

declare module 'react-force-graph-3d' {
  import type { ComponentType } from 'react';
  const ForceGraph3D: ComponentType<any>;
  export default ForceGraph3D;
}

declare module 'resium' {
  import type { ComponentType } from 'react';
  export const Viewer: ComponentType<any>;
}

declare module '@cesium/engine' {
  const engine: any;
  export default engine;
}
