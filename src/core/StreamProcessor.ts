/**
 * StreamProcessor — parses JSONL, SSE, WebSocket, or direct JSON into A2UIMessages
 *
 * Handles:
 * - JSONL over SSE (EventSource / ReadableStream)
 * - WebSocket messages
 * - Direct JSON arrays
 * - Single JSON objects
 *
 * Emits validated A2UIMessage objects to a callback.
 */

import type { A2UIMessage } from '../schema/a2ui-envelope';
import { isA2UIMessage } from '../schema/validation';

export type MessageCallback = (msg: A2UIMessage) => void;
export type ErrorCallback = (error: Error) => void;

export interface StreamProcessorOptions {
  onMessage: MessageCallback;
  onError?: ErrorCallback;
  /** Batch window in ms — messages arriving within this window are batched. Default: 0 (no batching) */
  batchWindow?: number;
}

export class StreamProcessor {
  private onMessage: MessageCallback;
  private onError: ErrorCallback;
  private batchWindow: number;
  private batchBuffer: A2UIMessage[] = [];
  private batchTimer: ReturnType<typeof setTimeout> | null = null;
  private abortController: AbortController | null = null;

  constructor(options: StreamProcessorOptions) {
    this.onMessage = options.onMessage;
    this.onError = options.onError ?? (() => {});
    this.batchWindow = options.batchWindow ?? 0;
  }

  /** Process a single parsed JSON object */
  processJSON(data: unknown): void {
    if (Array.isArray(data)) {
      for (const item of data) {
        this.processJSON(item);
      }
      return;
    }

    if (isA2UIMessage(data)) {
      this.emit(data);
    } else {
      this.onError(new Error(`Invalid A2UI message: ${JSON.stringify(data).slice(0, 200)}`));
    }
  }

  /** Process a JSONL string (newline-delimited JSON) */
  processJSONL(text: string): void {
    const lines = text.split('\n');
    for (const line of lines) {
      const trimmed = line.trim();
      if (!trimmed) continue;
      try {
        const parsed = JSON.parse(trimmed);
        this.processJSON(parsed);
      } catch (e) {
        this.onError(new Error(`Failed to parse JSONL line: ${trimmed.slice(0, 100)}`));
      }
    }
  }

  /** Connect to an SSE endpoint (EventSource-compatible) */
  connectSSE(url: string): () => void {
    const eventSource = new EventSource(url);

    eventSource.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        this.processJSON(data);
      } catch (e) {
        this.onError(new Error(`Failed to parse SSE data: ${(event.data as string).slice(0, 100)}`));
      }
    };

    eventSource.onerror = () => {
      this.onError(new Error('SSE connection error'));
    };

    return () => eventSource.close();
  }

  /** Connect to a fetch-based SSE stream (ReadableStream) */
  async connectStream(url: string, init?: RequestInit): Promise<() => void> {
    this.abortController = new AbortController();
    const signal = this.abortController.signal;

    try {
      const response = await fetch(url, { ...init, signal });
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }
      if (!response.body) {
        throw new Error('Response has no body');
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let buffer = '';

      const read = async () => {
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;

          buffer += decoder.decode(value, { stream: true });
          const lines = buffer.split('\n');
          buffer = lines.pop() ?? '';

          for (const line of lines) {
            const trimmed = line.trim();
            if (!trimmed) continue;
            // SSE format: strip "data: " prefix
            const payload = trimmed.startsWith('data: ') ? trimmed.slice(6) : trimmed;
            try {
              const parsed = JSON.parse(payload);
              this.processJSON(parsed);
            } catch {
              // Not JSON — skip
            }
          }
        }
        // Process remaining buffer
        if (buffer.trim()) {
          try {
            const parsed = JSON.parse(buffer.trim());
            this.processJSON(parsed);
          } catch {
            // ignore
          }
        }
      };

      read().catch((e) => {
        if (!signal.aborted) {
          this.onError(e instanceof Error ? e : new Error(String(e)));
        }
      });
    } catch (e) {
      if (!signal.aborted) {
        this.onError(e instanceof Error ? e : new Error(String(e)));
      }
    }

    return () => this.abortController?.abort();
  }

  /** Connect to a WebSocket */
  connectWebSocket(url: string): () => void {
    const ws = new WebSocket(url);

    ws.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data as string);
        this.processJSON(data);
      } catch (e) {
        this.onError(new Error(`Failed to parse WebSocket message`));
      }
    };

    ws.onerror = () => {
      this.onError(new Error('WebSocket error'));
    };

    return () => ws.close();
  }

  /** Flush any batched messages */
  flush(): void {
    if (this.batchBuffer.length > 0) {
      const msgs = this.batchBuffer;
      this.batchBuffer = [];
      for (const msg of msgs) {
        this.onMessage(msg);
      }
    }
    if (this.batchTimer !== null) {
      clearTimeout(this.batchTimer);
      this.batchTimer = null;
    }
  }

  /** Destroy the processor and clean up */
  destroy(): void {
    this.flush();
    this.abortController?.abort();
  }

  private emit(msg: A2UIMessage): void {
    if (this.batchWindow <= 0) {
      this.onMessage(msg);
      return;
    }

    this.batchBuffer.push(msg);
    if (this.batchTimer === null) {
      this.batchTimer = setTimeout(() => {
        this.flush();
      }, this.batchWindow);
    }
  }
}
