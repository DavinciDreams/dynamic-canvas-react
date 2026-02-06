/**
 * Streaming utilities — debounce + batching
 */

/** Debounce a function call */
export function debounce<T extends (...args: any[]) => void>(fn: T, ms: number): T & { cancel: () => void } {
  let timer: ReturnType<typeof setTimeout> | null = null;
  const debounced = (...args: any[]) => {
    if (timer !== null) clearTimeout(timer);
    timer = setTimeout(() => {
      timer = null;
      fn(...args);
    }, ms);
  };
  debounced.cancel = () => {
    if (timer !== null) {
      clearTimeout(timer);
      timer = null;
    }
  };
  return debounced as T & { cancel: () => void };
}

/** Batch multiple calls into one, collecting args */
export function batchCalls<T>(fn: (items: T[]) => void, ms: number): (item: T) => void {
  let buffer: T[] = [];
  let timer: ReturnType<typeof setTimeout> | null = null;

  return (item: T) => {
    buffer.push(item);
    if (timer === null) {
      timer = setTimeout(() => {
        const items = buffer;
        buffer = [];
        timer = null;
        fn(items);
      }, ms);
    }
  };
}
