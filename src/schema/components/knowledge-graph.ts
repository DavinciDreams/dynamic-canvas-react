/**
 * Knowledge Graph component schema for A2UI
 */

export interface KnowledgeGraphNode {
  id: string;
  label: string;
  group?: string;
  color?: string;
  size?: number;
  metadata?: Record<string, unknown>;
}

export interface KnowledgeGraphEdge {
  source: string;
  target: string;
  label?: string;
  weight?: number;
  color?: string;
  directed?: boolean;
}

export interface KnowledgeGraphComponent {
  id: string;
  component: 'KnowledgeGraph';
  /** JSON Pointer to nodes array in the surface data model */
  nodes: string;
  /** JSON Pointer to edges array in the surface data model */
  edges: string;
  title?: string;
  layout?: 'force' | 'radial' | 'hierarchical';
  threeD?: boolean;
  directed?: boolean;
  showLabels?: boolean;
  width?: number | string;
  height?: number | string;
}
