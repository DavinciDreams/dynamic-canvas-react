/**
 * Discriminated union of all A2UI component types
 */

export type { ChartComponent, ChartComponentAxis, ChartComponentSeries } from './components/chart';
export type { TimelineComponent, TimelineComponentEvent } from './components/timeline';
export type { KnowledgeGraphComponent, KnowledgeGraphNode, KnowledgeGraphEdge } from './components/knowledge-graph';
export type { MapComponent, MapMarker } from './components/map';
export type { MediaComponent } from './components/media';
export type { DocumentComponent } from './components/document';
export type { CodeComponent } from './components/code';
export type { ArtifactComponent } from './components/artifact';
export type { CustomComponent } from './components/custom';

import type { ChartComponent } from './components/chart';
import type { TimelineComponent } from './components/timeline';
import type { KnowledgeGraphComponent } from './components/knowledge-graph';
import type { MapComponent } from './components/map';
import type { MediaComponent } from './components/media';
import type { DocumentComponent } from './components/document';
import type { CodeComponent } from './components/code';
import type { ArtifactComponent } from './components/artifact';
import type { CustomComponent } from './components/custom';

/** Discriminated union of all component types — switch on `.component` */
export type A2UIComponent =
  | ChartComponent
  | TimelineComponent
  | KnowledgeGraphComponent
  | MapComponent
  | MediaComponent
  | DocumentComponent
  | CodeComponent
  | ArtifactComponent
  | CustomComponent;

/** String literal union of all component type names */
export type A2UIComponentType = A2UIComponent['component'];

/** All known component type names */
export const A2UI_COMPONENT_TYPES = [
  'Chart',
  'Timeline',
  'KnowledgeGraph',
  'Map',
  'Media',
  'Document',
  'Code',
  'Artifact',
  'Custom',
] as const;
