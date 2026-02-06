/**
 * SurfaceManager — A2UI surface lifecycle, data model, and component store
 *
 * Uses zustand for reactive state management. Each surface has:
 * - An id and optional metadata
 * - A data model (arbitrary JSON, addressed via JSON Pointers)
 * - A list of A2UI components that reference the data model
 */

import { createStore, type StoreApi } from 'zustand/vanilla';
import type { A2UIComponent } from '../schema/component-types';
import type { A2UIMessage } from '../schema/a2ui-envelope';
import { getMessageType } from '../schema/a2ui-envelope';
import { resolvePointer, setPointer, appendAtPointer } from '../utils/jsonPointer';

export interface Surface {
  surfaceId: string;
  catalogId?: string;
  title?: string;
  metadata?: Record<string, unknown>;
  dataModel: Record<string, unknown>;
  components: A2UIComponent[];
  createdAt: number;
  updatedAt: number;
}

export interface SurfaceManagerState {
  surfaces: Record<string, Surface>;
  activeSurfaceId: string | null;
}

export interface SurfaceManagerActions {
  /** Process an A2UI message */
  processMessage: (msg: A2UIMessage) => void;
  /** Process multiple messages (batch) */
  processMessages: (msgs: A2UIMessage[]) => void;
  /** Get a surface by id */
  getSurface: (surfaceId: string) => Surface | undefined;
  /** Resolve a JSON Pointer on a surface's data model */
  resolveData: (surfaceId: string, pointer: string) => unknown;
  /** Set the active surface */
  setActiveSurface: (surfaceId: string | null) => void;
  /** Get all surface ids */
  getSurfaceIds: () => string[];
  /** Reset all surfaces */
  reset: () => void;
}

export type SurfaceManagerStore = SurfaceManagerState & SurfaceManagerActions;

const INITIAL_STATE: SurfaceManagerState = {
  surfaces: {},
  activeSurfaceId: null,
};

function deepMergePatch(target: Record<string, unknown>, patch: Record<string, unknown>): Record<string, unknown> {
  const result = { ...target };
  for (const key of Object.keys(patch)) {
    const val = patch[key];
    if (val === null) {
      delete result[key];
    } else if (typeof val === 'object' && !Array.isArray(val) && typeof result[key] === 'object' && !Array.isArray(result[key])) {
      result[key] = deepMergePatch(result[key] as Record<string, unknown>, val as Record<string, unknown>);
    } else {
      result[key] = val;
    }
  }
  return result;
}

export function createSurfaceManager(): StoreApi<SurfaceManagerStore> {
  return createStore<SurfaceManagerStore>((set, get) => ({
    ...INITIAL_STATE,

    processMessage(msg: A2UIMessage) {
      const type = getMessageType(msg);
      const now = Date.now();

      switch (type) {
        case 'createSurface': {
          const { surfaceId, catalogId, title, metadata } = (msg as { createSurface: Surface }).createSurface;
          set((state) => ({
            surfaces: {
              ...state.surfaces,
              [surfaceId]: {
                surfaceId,
                catalogId,
                title,
                metadata,
                dataModel: {},
                components: [],
                createdAt: now,
                updatedAt: now,
              },
            },
            activeSurfaceId: state.activeSurfaceId ?? surfaceId,
          }));
          break;
        }

        case 'destroySurface': {
          const { surfaceId } = (msg as { destroySurface: { surfaceId: string } }).destroySurface;
          set((state) => {
            const { [surfaceId]: _, ...rest } = state.surfaces;
            return {
              surfaces: rest,
              activeSurfaceId: state.activeSurfaceId === surfaceId ? null : state.activeSurfaceId,
            };
          });
          break;
        }

        case 'updateDataModel': {
          const { surfaceId, path, value } = (msg as { updateDataModel: { surfaceId: string; path: string; value: unknown } }).updateDataModel;
          set((state) => {
            const surface = state.surfaces[surfaceId];
            if (!surface) return state;
            return {
              surfaces: {
                ...state.surfaces,
                [surfaceId]: {
                  ...surface,
                  dataModel: setPointer(surface.dataModel, path, value) as Record<string, unknown>,
                  updatedAt: now,
                },
              },
            };
          });
          break;
        }

        case 'updateComponents': {
          const { surfaceId, components } = (msg as { updateComponents: { surfaceId: string; components: A2UIComponent[] } }).updateComponents;
          set((state) => {
            const surface = state.surfaces[surfaceId];
            if (!surface) return state;
            // Merge: update existing by id, add new ones
            const existingById = new Map(surface.components.map((c) => [c.id, c]));
            for (const comp of components) {
              existingById.set(comp.id, comp);
            }
            return {
              surfaces: {
                ...state.surfaces,
                [surfaceId]: {
                  ...surface,
                  components: Array.from(existingById.values()),
                  updatedAt: now,
                },
              },
            };
          });
          break;
        }

        case 'removeComponents': {
          const { surfaceId, componentIds } = (msg as { removeComponents: { surfaceId: string; componentIds: string[] } }).removeComponents;
          set((state) => {
            const surface = state.surfaces[surfaceId];
            if (!surface) return state;
            const removeSet = new Set(componentIds);
            return {
              surfaces: {
                ...state.surfaces,
                [surfaceId]: {
                  ...surface,
                  components: surface.components.filter((c) => !removeSet.has(c.id)),
                  updatedAt: now,
                },
              },
            };
          });
          break;
        }

        case 'appendData': {
          const { surfaceId, path, items } = (msg as { appendData: { surfaceId: string; path: string; items: unknown[] } }).appendData;
          set((state) => {
            const surface = state.surfaces[surfaceId];
            if (!surface) return state;
            return {
              surfaces: {
                ...state.surfaces,
                [surfaceId]: {
                  ...surface,
                  dataModel: appendAtPointer(surface.dataModel, path, items) as Record<string, unknown>,
                  updatedAt: now,
                },
              },
            };
          });
          break;
        }

        case 'patchDataModel': {
          const { surfaceId, patch } = (msg as { patchDataModel: { surfaceId: string; patch: Record<string, unknown> } }).patchDataModel;
          set((state) => {
            const surface = state.surfaces[surfaceId];
            if (!surface) return state;
            return {
              surfaces: {
                ...state.surfaces,
                [surfaceId]: {
                  ...surface,
                  dataModel: deepMergePatch(surface.dataModel, patch),
                  updatedAt: now,
                },
              },
            };
          });
          break;
        }
      }
    },

    processMessages(msgs: A2UIMessage[]) {
      for (const msg of msgs) {
        get().processMessage(msg);
      }
    },

    getSurface(surfaceId: string) {
      return get().surfaces[surfaceId];
    },

    resolveData(surfaceId: string, pointer: string) {
      const surface = get().surfaces[surfaceId];
      if (!surface) return undefined;
      return resolvePointer(surface.dataModel, pointer);
    },

    setActiveSurface(surfaceId: string | null) {
      set({ activeSurfaceId: surfaceId });
    },

    getSurfaceIds() {
      return Object.keys(get().surfaces);
    },

    reset() {
      set(INITIAL_STATE);
    },
  }));
}
