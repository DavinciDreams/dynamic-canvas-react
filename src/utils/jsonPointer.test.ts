import { describe, it, expect } from 'vitest';
import { parsePointer, resolvePointer, setPointer, appendAtPointer, escapeToken } from './jsonPointer';

describe('jsonPointer', () => {
  describe('parsePointer', () => {
    it('parses empty string to empty tokens', () => {
      expect(parsePointer('')).toEqual([]);
    });

    it('parses root slash', () => {
      expect(parsePointer('/')).toEqual(['']);
    });

    it('parses simple path', () => {
      expect(parsePointer('/foo/bar')).toEqual(['foo', 'bar']);
    });

    it('parses path with numeric indices', () => {
      expect(parsePointer('/items/0/name')).toEqual(['items', '0', 'name']);
    });

    it('unescapes ~1 to / and ~0 to ~', () => {
      expect(parsePointer('/a~1b/c~0d')).toEqual(['a/b', 'c~d']);
    });

    it('throws on invalid pointer (no leading /)', () => {
      expect(() => parsePointer('foo')).toThrow('Invalid JSON Pointer');
    });
  });

  describe('escapeToken', () => {
    it('escapes ~ and /', () => {
      expect(escapeToken('a/b~c')).toBe('a~1b~0c');
    });

    it('leaves plain strings unchanged', () => {
      expect(escapeToken('hello')).toBe('hello');
    });
  });

  describe('resolvePointer', () => {
    const data = {
      timeline: {
        events: [
          { date: '2024-01-01', title: 'Start' },
          { date: '2024-06-01', title: 'Mid' },
        ],
      },
      name: 'test',
    };

    it('resolves empty pointer to root', () => {
      expect(resolvePointer(data, '')).toBe(data);
    });

    it('resolves top-level key', () => {
      expect(resolvePointer(data, '/name')).toBe('test');
    });

    it('resolves nested object', () => {
      expect(resolvePointer(data, '/timeline/events')).toBe(data.timeline.events);
    });

    it('resolves array index', () => {
      expect(resolvePointer(data, '/timeline/events/0')).toBe(data.timeline.events[0]);
    });

    it('resolves deeply nested value', () => {
      expect(resolvePointer(data, '/timeline/events/1/title')).toBe('Mid');
    });

    it('returns undefined for missing path', () => {
      expect(resolvePointer(data, '/nonexistent')).toBeUndefined();
    });

    it('returns undefined for out-of-bounds index', () => {
      expect(resolvePointer(data, '/timeline/events/99')).toBeUndefined();
    });

    it('handles null data', () => {
      expect(resolvePointer(null, '/foo')).toBeUndefined();
    });
  });

  describe('setPointer', () => {
    it('sets a top-level key', () => {
      const result = setPointer({}, '/name', 'hello') as Record<string, unknown>;
      expect(result.name).toBe('hello');
    });

    it('sets a nested key, creating intermediates', () => {
      const result = setPointer({}, '/a/b/c', 42) as Record<string, unknown>;
      expect((result.a as any).b.c).toBe(42);
    });

    it('replaces an existing value immutably', () => {
      const original = { x: 1, y: 2 };
      const result = setPointer(original, '/x', 99) as Record<string, unknown>;
      expect(result.x).toBe(99);
      expect(original.x).toBe(1); // original unchanged
    });

    it('sets a value at empty pointer (replaces root)', () => {
      const result = setPointer({ old: 'data' }, '', 'newroot');
      expect(result).toBe('newroot');
    });

    it('creates array when next token is numeric', () => {
      const result = setPointer({}, '/items/0', 'first') as any;
      expect(Array.isArray(result.items)).toBe(true);
      expect(result.items[0]).toBe('first');
    });
  });

  describe('appendAtPointer', () => {
    it('appends to an existing array', () => {
      const data = { items: [1, 2] };
      const result = appendAtPointer(data, '/items', [3, 4]) as any;
      expect(result.items).toEqual([1, 2, 3, 4]);
    });

    it('creates a new array when path does not exist', () => {
      const result = appendAtPointer({}, '/items', ['a', 'b']) as any;
      expect(result.items).toEqual(['a', 'b']);
    });

    it('does not mutate original', () => {
      const data = { items: [1] };
      appendAtPointer(data, '/items', [2]);
      expect(data.items).toEqual([1]);
    });
  });
});
