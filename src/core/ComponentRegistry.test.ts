import { describe, it, expect, vi } from 'vitest';
import { ComponentRegistry, createDefaultRegistry } from './ComponentRegistry';

describe('ComponentRegistry', () => {
  describe('register + resolve', () => {
    it('resolves a registered renderer', async () => {
      const registry = new ComponentRegistry();
      const MockComponent = () => null;
      registry.register('Chart', async () => ({ default: MockComponent }));

      const resolved = await registry.resolve('Chart');
      expect(resolved).toBe(MockComponent);
    });

    it('caches resolved renderer', async () => {
      const registry = new ComponentRegistry();
      const factory = vi.fn(async () => ({ default: (() => null) as any }));
      registry.register('Chart', factory);

      await registry.resolve('Chart');
      await registry.resolve('Chart');
      expect(factory).toHaveBeenCalledTimes(1);
    });

    it('returns null for unregistered type', async () => {
      const registry = new ComponentRegistry();
      const result = await registry.resolve('NonExistent');
      expect(result).toBeNull();
    });
  });

  describe('custom renderers', () => {
    it('registers and resolves a custom renderer by key', async () => {
      const registry = new ComponentRegistry();
      const CustomComp = () => null;
      registry.registerCustom('my-widget', async () => ({ default: CustomComp }));

      const resolved = await registry.resolve('Custom', 'my-widget');
      expect(resolved).toBe(CustomComp);
    });

    it('registerCustomSync works without async', async () => {
      const registry = new ComponentRegistry();
      const CustomComp = () => null;
      registry.registerCustomSync('widget', CustomComp);

      const resolved = await registry.resolve('Custom', 'widget');
      expect(resolved).toBe(CustomComp);
    });

    it('returns null for unregistered custom key', async () => {
      const registry = new ComponentRegistry();
      const result = await registry.resolve('Custom', 'missing-key');
      expect(result).toBeNull();
    });
  });

  describe('has / getRegisteredTypes', () => {
    it('reports registered types', () => {
      const registry = new ComponentRegistry();
      registry.register('Chart', async () => ({ default: (() => null) as any }));
      registry.register('Timeline', async () => ({ default: (() => null) as any }));

      expect(registry.has('Chart')).toBe(true);
      expect(registry.has('Map')).toBe(false);
      expect(registry.getRegisteredTypes()).toEqual(['Chart', 'Timeline']);
    });

    it('reports custom keys', () => {
      const registry = new ComponentRegistry();
      registry.registerCustomSync('widget', (() => null) as any);

      expect(registry.hasCustom('widget')).toBe(true);
      expect(registry.hasCustom('nope')).toBe(false);
      expect(registry.getCustomKeys()).toEqual(['widget']);
    });
  });

  describe('createDefaultRegistry', () => {
    it('registers all built-in types', () => {
      const registry = createDefaultRegistry();
      const types = ['Chart', 'Timeline', 'KnowledgeGraph', 'Map', 'Media', 'Document', 'Code', 'Artifact', 'Custom'];
      for (const type of types) {
        expect(registry.has(type)).toBe(true);
      }
    });
  });
});
