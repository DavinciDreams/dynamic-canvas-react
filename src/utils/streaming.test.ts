import { describe, it, expect, vi } from 'vitest';
import { debounce, batchCalls } from './streaming';

describe('streaming utilities', () => {
  describe('debounce', () => {
    it('delays function execution', async () => {
      const fn = vi.fn();
      const debounced = debounce(fn, 50);

      debounced();
      debounced();
      debounced();
      expect(fn).not.toHaveBeenCalled();

      await new Promise((r) => setTimeout(r, 80));
      expect(fn).toHaveBeenCalledTimes(1);
    });

    it('cancel prevents execution', async () => {
      const fn = vi.fn();
      const debounced = debounce(fn, 50);

      debounced();
      debounced.cancel();

      await new Promise((r) => setTimeout(r, 80));
      expect(fn).not.toHaveBeenCalled();
    });
  });

  describe('batchCalls', () => {
    it('batches items and delivers together', async () => {
      const handler = vi.fn();
      const add = batchCalls<number>(handler, 50);

      add(1);
      add(2);
      add(3);
      expect(handler).not.toHaveBeenCalled();

      await new Promise((r) => setTimeout(r, 80));
      expect(handler).toHaveBeenCalledTimes(1);
      expect(handler).toHaveBeenCalledWith([1, 2, 3]);
    });
  });
});
