/**
 * useA2UISurface — Primary hook: connect to an A2UI stream, get surfaces
 */

import { useEffect, useMemo, useRef, useCallback } from 'react';
import { useStore } from 'zustand';
import type { StoreApi } from 'zustand/vanilla';
import type { A2UIMessage } from '../schema/a2ui-envelope';
import type { A2UIComponent } from '../schema/component-types';
import { createSurfaceManager, type SurfaceManagerStore, type Surface } from '../core/SurfaceManager';
import { StreamProcessor } from '../core/StreamProcessor';

export interface UseA2UISurfaceOptions {
  /** SSE endpoint URL */
  sseUrl?: string;
  /** WebSocket endpoint URL */
  wsUrl?: string;
  /** Fetch stream URL + init */
  streamUrl?: string;
  streamInit?: RequestInit;
  /** Direct messages (for non-streaming use) */
  messages?: A2UIMessage[];
  /** Batch window for stream processor (ms) */
  batchWindow?: number;
  /** Error callback */
  onError?: (error: Error) => void;
  /** Provide an external store (for sharing across components) */
  store?: StoreApi<SurfaceManagerStore>;
}

export interface A2UISurfaceResult {
  /** All surfaces keyed by id */
  surfaces: Record<string, Surface>;
  /** Currently active surface */
  activeSurface: Surface | undefined;
  /** Set the active surface */
  setActiveSurface: (id: string | null) => void;
  /** Manually process a message */
  processMessage: (msg: A2UIMessage) => void;
  /** Manually process multiple messages */
  processMessages: (msgs: A2UIMessage[]) => void;
  /** Resolve data from a surface's data model */
  resolveData: (surfaceId: string, pointer: string) => unknown;
  /** Get components for a surface */
  getComponents: (surfaceId: string) => A2UIComponent[];
  /** The underlying store */
  store: StoreApi<SurfaceManagerStore>;
}

export function useA2UISurface(options: UseA2UISurfaceOptions = {}): A2UISurfaceResult {
  const {
    sseUrl,
    wsUrl,
    streamUrl,
    streamInit,
    messages,
    batchWindow = 50,
    onError,
    store: externalStore,
  } = options;

  const storeRef = useRef<StoreApi<SurfaceManagerStore>>(externalStore ?? createSurfaceManager());
  const store = storeRef.current;

  const surfaces = useStore(store, (s) => s.surfaces);
  const activeSurfaceId = useStore(store, (s) => s.activeSurfaceId);

  // Process direct messages when they change
  useEffect(() => {
    if (messages && messages.length > 0) {
      store.getState().processMessages(messages);
    }
  }, [messages, store]);

  // Set up stream connections
  useEffect(() => {
    const processor = new StreamProcessor({
      onMessage: (msg) => store.getState().processMessage(msg),
      onError,
      batchWindow,
    });

    const cleanups: (() => void)[] = [];

    if (sseUrl) {
      cleanups.push(processor.connectSSE(sseUrl));
    }

    if (wsUrl) {
      cleanups.push(processor.connectWebSocket(wsUrl));
    }

    if (streamUrl) {
      processor.connectStream(streamUrl, streamInit).then((cleanup) => {
        cleanups.push(cleanup);
      });
    }

    return () => {
      processor.destroy();
      for (const cleanup of cleanups) cleanup();
    };
  }, [sseUrl, wsUrl, streamUrl, batchWindow, store, onError, streamInit]);

  const activeSurface = activeSurfaceId ? surfaces[activeSurfaceId] : undefined;

  const setActiveSurface = useCallback(
    (id: string | null) => store.getState().setActiveSurface(id),
    [store],
  );
  const processMessage = useCallback(
    (msg: A2UIMessage) => store.getState().processMessage(msg),
    [store],
  );
  const processMessages = useCallback(
    (msgs: A2UIMessage[]) => store.getState().processMessages(msgs),
    [store],
  );
  const resolveData = useCallback(
    (surfaceId: string, pointer: string) => store.getState().resolveData(surfaceId, pointer),
    [store],
  );
  const getComponents = useCallback(
    (surfaceId: string) => store.getState().getSurface(surfaceId)?.components ?? [],
    [store],
  );

  return useMemo(() => ({
    surfaces,
    activeSurface,
    setActiveSurface,
    processMessage,
    processMessages,
    resolveData,
    getComponents,
    store,
  }), [surfaces, activeSurface, setActiveSurface, processMessage, processMessages, resolveData, getComponents, store]);
}
