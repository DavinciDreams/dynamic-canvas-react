/**
 * A2UI envelope message types (server → client)
 *
 * Messages follow the A2UI protocol for streaming UI updates
 * from an AI agent to a client renderer.
 */

import type { A2UIComponent } from './component-types';

/** Create a new surface (UI canvas) */
export interface CreateSurfaceMessage {
  createSurface: {
    surfaceId: string;
    catalogId?: string;
    title?: string;
    metadata?: Record<string, unknown>;
  };
}

/** Destroy a surface */
export interface DestroySurfaceMessage {
  destroySurface: {
    surfaceId: string;
  };
}

/** Update the data model at a JSON Pointer path */
export interface UpdateDataModelMessage {
  updateDataModel: {
    surfaceId: string;
    /** RFC 6901 JSON Pointer (e.g. "/timeline/events") */
    path: string;
    value: unknown;
  };
}

/** Set or replace components on a surface */
export interface UpdateComponentsMessage {
  updateComponents: {
    surfaceId: string;
    components: A2UIComponent[];
  };
}

/** Remove specific components by id */
export interface RemoveComponentsMessage {
  removeComponents: {
    surfaceId: string;
    componentIds: string[];
  };
}

/** Append data to an array at a JSON Pointer path (streaming convenience) */
export interface AppendDataMessage {
  appendData: {
    surfaceId: string;
    /** RFC 6901 JSON Pointer to an array */
    path: string;
    items: unknown[];
  };
}

/** Patch the data model (JSON merge-patch style) */
export interface PatchDataModelMessage {
  patchDataModel: {
    surfaceId: string;
    patch: Record<string, unknown>;
  };
}

/** Discriminated union of all A2UI envelope messages */
export type A2UIMessage =
  | CreateSurfaceMessage
  | DestroySurfaceMessage
  | UpdateDataModelMessage
  | UpdateComponentsMessage
  | RemoveComponentsMessage
  | AppendDataMessage
  | PatchDataModelMessage;

/** Helper to determine message type */
export function getMessageType(msg: A2UIMessage): string {
  if ('createSurface' in msg) return 'createSurface';
  if ('destroySurface' in msg) return 'destroySurface';
  if ('updateDataModel' in msg) return 'updateDataModel';
  if ('updateComponents' in msg) return 'updateComponents';
  if ('removeComponents' in msg) return 'removeComponents';
  if ('appendData' in msg) return 'appendData';
  if ('patchDataModel' in msg) return 'patchDataModel';
  return 'unknown';
}
