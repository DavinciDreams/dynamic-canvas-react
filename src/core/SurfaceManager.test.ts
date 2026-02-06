import { describe, it, expect, beforeEach } from 'vitest';
import type { StoreApi } from 'zustand/vanilla';
import { createSurfaceManager, type SurfaceManagerStore } from './SurfaceManager';

describe('SurfaceManager', () => {
  let store: StoreApi<SurfaceManagerStore>;

  beforeEach(() => {
    store = createSurfaceManager();
  });

  describe('createSurface', () => {
    it('creates a surface', () => {
      store.getState().processMessage({
        createSurface: { surfaceId: 's1', catalogId: 'dynamic-canvas/v1', title: 'Test' },
      });

      const surface = store.getState().getSurface('s1');
      expect(surface).toBeDefined();
      expect(surface!.surfaceId).toBe('s1');
      expect(surface!.catalogId).toBe('dynamic-canvas/v1');
      expect(surface!.title).toBe('Test');
      expect(surface!.components).toEqual([]);
      expect(surface!.dataModel).toEqual({});
    });

    it('auto-sets active surface to first created', () => {
      expect(store.getState().activeSurfaceId).toBeNull();

      store.getState().processMessage({ createSurface: { surfaceId: 's1' } });
      expect(store.getState().activeSurfaceId).toBe('s1');

      store.getState().processMessage({ createSurface: { surfaceId: 's2' } });
      expect(store.getState().activeSurfaceId).toBe('s1'); // unchanged
    });
  });

  describe('destroySurface', () => {
    it('removes a surface', () => {
      store.getState().processMessage({ createSurface: { surfaceId: 's1' } });
      store.getState().processMessage({ destroySurface: { surfaceId: 's1' } });
      expect(store.getState().getSurface('s1')).toBeUndefined();
    });

    it('clears active surface if destroyed', () => {
      store.getState().processMessage({ createSurface: { surfaceId: 's1' } });
      expect(store.getState().activeSurfaceId).toBe('s1');
      store.getState().processMessage({ destroySurface: { surfaceId: 's1' } });
      expect(store.getState().activeSurfaceId).toBeNull();
    });
  });

  describe('updateDataModel', () => {
    it('sets data at a path', () => {
      store.getState().processMessage({ createSurface: { surfaceId: 's1' } });
      store.getState().processMessage({
        updateDataModel: {
          surfaceId: 's1',
          path: '/timeline/events',
          value: [{ date: '2024-01-01', title: 'Start' }],
        },
      });

      const data = store.getState().resolveData('s1', '/timeline/events');
      expect(data).toEqual([{ date: '2024-01-01', title: 'Start' }]);
    });

    it('replaces existing data', () => {
      store.getState().processMessage({ createSurface: { surfaceId: 's1' } });
      store.getState().processMessage({
        updateDataModel: { surfaceId: 's1', path: '/name', value: 'first' },
      });
      store.getState().processMessage({
        updateDataModel: { surfaceId: 's1', path: '/name', value: 'second' },
      });

      expect(store.getState().resolveData('s1', '/name')).toBe('second');
    });

    it('ignores updates to nonexistent surfaces', () => {
      store.getState().processMessage({
        updateDataModel: { surfaceId: 'nope', path: '/x', value: 1 },
      });
      expect(store.getState().getSurface('nope')).toBeUndefined();
    });
  });

  describe('updateComponents', () => {
    it('adds components', () => {
      store.getState().processMessage({ createSurface: { surfaceId: 's1' } });
      store.getState().processMessage({
        updateComponents: {
          surfaceId: 's1',
          components: [
            { id: 't1', component: 'Timeline', events: '/timeline/events' },
          ],
        },
      });

      const surface = store.getState().getSurface('s1')!;
      expect(surface.components).toHaveLength(1);
      expect(surface.components[0].id).toBe('t1');
      expect(surface.components[0].component).toBe('Timeline');
    });

    it('merges/updates existing components by id', () => {
      store.getState().processMessage({ createSurface: { surfaceId: 's1' } });
      store.getState().processMessage({
        updateComponents: {
          surfaceId: 's1',
          components: [
            { id: 'c1', component: 'Chart', chartType: 'bar', data: '/data' },
          ],
        },
      });
      store.getState().processMessage({
        updateComponents: {
          surfaceId: 's1',
          components: [
            { id: 'c1', component: 'Chart', chartType: 'line', data: '/data' },
          ],
        },
      });

      const surface = store.getState().getSurface('s1')!;
      expect(surface.components).toHaveLength(1);
      expect((surface.components[0] as any).chartType).toBe('line');
    });

    it('adds new components alongside existing ones', () => {
      store.getState().processMessage({ createSurface: { surfaceId: 's1' } });
      store.getState().processMessage({
        updateComponents: {
          surfaceId: 's1',
          components: [{ id: 'a', component: 'Code', code: 'x' }],
        },
      });
      store.getState().processMessage({
        updateComponents: {
          surfaceId: 's1',
          components: [{ id: 'b', component: 'Document', content: 'y' }],
        },
      });

      const surface = store.getState().getSurface('s1')!;
      expect(surface.components).toHaveLength(2);
    });
  });

  describe('removeComponents', () => {
    it('removes components by id', () => {
      store.getState().processMessage({ createSurface: { surfaceId: 's1' } });
      store.getState().processMessage({
        updateComponents: {
          surfaceId: 's1',
          components: [
            { id: 'a', component: 'Code', code: 'x' },
            { id: 'b', component: 'Document', content: 'y' },
          ],
        },
      });
      store.getState().processMessage({
        removeComponents: { surfaceId: 's1', componentIds: ['a'] },
      });

      const surface = store.getState().getSurface('s1')!;
      expect(surface.components).toHaveLength(1);
      expect(surface.components[0].id).toBe('b');
    });
  });

  describe('appendData', () => {
    it('appends items to an array', () => {
      store.getState().processMessage({ createSurface: { surfaceId: 's1' } });
      store.getState().processMessage({
        updateDataModel: { surfaceId: 's1', path: '/items', value: [1, 2] },
      });
      store.getState().processMessage({
        appendData: { surfaceId: 's1', path: '/items', items: [3, 4] },
      });

      expect(store.getState().resolveData('s1', '/items')).toEqual([1, 2, 3, 4]);
    });

    it('creates an array when path does not exist', () => {
      store.getState().processMessage({ createSurface: { surfaceId: 's1' } });
      store.getState().processMessage({
        appendData: { surfaceId: 's1', path: '/new', items: ['a'] },
      });

      expect(store.getState().resolveData('s1', '/new')).toEqual(['a']);
    });
  });

  describe('patchDataModel', () => {
    it('merges a patch into the data model', () => {
      store.getState().processMessage({ createSurface: { surfaceId: 's1' } });
      store.getState().processMessage({
        updateDataModel: { surfaceId: 's1', path: '/config', value: { a: 1, b: 2 } },
      });
      store.getState().processMessage({
        patchDataModel: { surfaceId: 's1', patch: { config: { b: 99, c: 3 } } },
      });

      const dm = store.getState().getSurface('s1')!.dataModel;
      expect((dm.config as any).a).toBe(1);
      expect((dm.config as any).b).toBe(99);
      expect((dm.config as any).c).toBe(3);
    });

    it('removes keys set to null in patch', () => {
      store.getState().processMessage({ createSurface: { surfaceId: 's1' } });
      store.getState().processMessage({
        patchDataModel: { surfaceId: 's1', patch: { x: 1, y: 2 } },
      });
      store.getState().processMessage({
        patchDataModel: { surfaceId: 's1', patch: { x: null } },
      });

      const dm = store.getState().getSurface('s1')!.dataModel;
      expect(dm.x).toBeUndefined();
      expect(dm.y).toBe(2);
    });
  });

  describe('processMessages (batch)', () => {
    it('processes multiple messages in sequence', () => {
      store.getState().processMessages([
        { createSurface: { surfaceId: 's1' } },
        { updateDataModel: { surfaceId: 's1', path: '/x', value: 42 } },
        {
          updateComponents: {
            surfaceId: 's1',
            components: [{ id: 'c1', component: 'Code', code: 'hello' }],
          },
        },
      ]);

      const surface = store.getState().getSurface('s1')!;
      expect(surface.dataModel).toEqual({ x: 42 });
      expect(surface.components).toHaveLength(1);
    });
  });

  describe('utility methods', () => {
    it('getSurfaceIds returns all ids', () => {
      store.getState().processMessage({ createSurface: { surfaceId: 'a' } });
      store.getState().processMessage({ createSurface: { surfaceId: 'b' } });
      const ids = store.getState().getSurfaceIds();
      expect(ids).toContain('a');
      expect(ids).toContain('b');
    });

    it('setActiveSurface works', () => {
      store.getState().processMessage({ createSurface: { surfaceId: 'a' } });
      store.getState().processMessage({ createSurface: { surfaceId: 'b' } });
      store.getState().setActiveSurface('b');
      expect(store.getState().activeSurfaceId).toBe('b');
    });

    it('reset clears everything', () => {
      store.getState().processMessage({ createSurface: { surfaceId: 'a' } });
      store.getState().reset();
      expect(store.getState().surfaces).toEqual({});
      expect(store.getState().activeSurfaceId).toBeNull();
    });
  });
});
