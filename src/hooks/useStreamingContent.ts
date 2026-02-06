/**
 * useStreamingContent — Subscribe to a single surface's streaming updates
 */

import { useMemo } from 'react';
import { useStore } from 'zustand';
import type { StoreApi } from 'zustand/vanilla';
import type { A2UIComponent } from '../schema/component-types';
import type { SurfaceManagerStore, Surface } from '../core/SurfaceManager';
import { resolvePointer } from '../utils/jsonPointer';

export interface UseStreamingContentOptions {
  store: StoreApi<SurfaceManagerStore>;
  surfaceId: string;
}

export interface StreamingContentResult {
  surface: Surface | undefined;
  components: A2UIComponent[];
  dataModel: Record<string, unknown>;
  /** Resolve a JSON Pointer in this surface's data model */
  resolveData: (pointer: string) => unknown;
  updatedAt: number;
}

export function useStreamingContent(options: UseStreamingContentOptions): StreamingContentResult {
  const { store, surfaceId } = options;

  const surface = useStore(store, (s) => s.surfaces[surfaceId]);
  const components = surface?.components ?? [];
  const dataModel = surface?.dataModel ?? {};
  const updatedAt = surface?.updatedAt ?? 0;

  const resolveData = useMemo(
    () => (pointer: string) => resolvePointer(dataModel, pointer),
    [dataModel],
  );

  return useMemo(() => ({
    surface,
    components,
    dataModel,
    resolveData,
    updatedAt,
  }), [surface, components, dataModel, resolveData, updatedAt]);
}
