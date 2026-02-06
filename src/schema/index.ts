/**
 * Schema-only entry point — re-exports all A2UI types and utilities
 * Zero React dependencies
 */

// Envelope messages
export type {
  A2UIMessage,
  CreateSurfaceMessage,
  DestroySurfaceMessage,
  UpdateDataModelMessage,
  UpdateComponentsMessage,
  RemoveComponentsMessage,
  AppendDataMessage,
  PatchDataModelMessage,
} from './a2ui-envelope';
export { getMessageType } from './a2ui-envelope';

// Component types (discriminated union)
export type {
  A2UIComponent,
  A2UIComponentType,
  ChartComponent,
  ChartComponentAxis,
  ChartComponentSeries,
  TimelineComponent,
  TimelineComponentEvent,
  KnowledgeGraphComponent,
  KnowledgeGraphNode,
  KnowledgeGraphEdge,
  MapComponent,
  MapMarker,
  MediaComponent,
  DocumentComponent,
  CodeComponent,
  ArtifactComponent,
  CustomComponent,
} from './component-types';
export { A2UI_COMPONENT_TYPES } from './component-types';

// Catalog
export type {
  ComponentCatalog,
  CatalogComponentDef,
  CatalogComponentField,
} from './catalog-definition';
export { DYNAMIC_CANVAS_CATALOG } from './catalog-definition';

// Validation
export {
  validateMessage,
  validateComponent,
  isA2UIMessage,
  isA2UIComponent,
  type ValidationResult,
} from './validation';
