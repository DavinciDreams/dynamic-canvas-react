import { describe, it, expect } from 'vitest';
import { validateMessage, validateComponent, isA2UIMessage, isA2UIComponent } from './validation';

describe('A2UI Validation', () => {
  describe('validateMessage', () => {
    it('validates createSurface', () => {
      const result = validateMessage({
        createSurface: { surfaceId: 's1', catalogId: 'dynamic-canvas/v1' },
      });
      expect(result.valid).toBe(true);
      expect(result.errors).toEqual([]);
    });

    it('rejects createSurface without surfaceId', () => {
      const result = validateMessage({ createSurface: {} });
      expect(result.valid).toBe(false);
      expect(result.errors[0]).toContain('surfaceId');
    });

    it('validates destroySurface', () => {
      const result = validateMessage({ destroySurface: { surfaceId: 's1' } });
      expect(result.valid).toBe(true);
    });

    it('validates updateDataModel', () => {
      const result = validateMessage({
        updateDataModel: { surfaceId: 's1', path: '/timeline/events', value: [] },
      });
      expect(result.valid).toBe(true);
    });

    it('rejects updateDataModel with invalid path', () => {
      const result = validateMessage({
        updateDataModel: { surfaceId: 's1', path: 'no-slash', value: [] },
      });
      expect(result.valid).toBe(false);
      expect(result.errors[0]).toContain('JSON Pointer');
    });

    it('validates updateDataModel with empty path', () => {
      const result = validateMessage({
        updateDataModel: { surfaceId: 's1', path: '', value: {} },
      });
      expect(result.valid).toBe(true);
    });

    it('validates updateComponents', () => {
      const result = validateMessage({
        updateComponents: {
          surfaceId: 's1',
          components: [{ id: 't1', component: 'Timeline' }],
        },
      });
      expect(result.valid).toBe(true);
    });

    it('rejects updateComponents with invalid component type', () => {
      const result = validateMessage({
        updateComponents: {
          surfaceId: 's1',
          components: [{ id: 't1', component: 'FakeComponent' }],
        },
      });
      expect(result.valid).toBe(false);
      expect(result.errors[0]).toContain('unknown component type');
    });

    it('rejects updateComponents with missing id', () => {
      const result = validateMessage({
        updateComponents: {
          surfaceId: 's1',
          components: [{ component: 'Timeline' }],
        },
      });
      expect(result.valid).toBe(false);
    });

    it('validates removeComponents', () => {
      const result = validateMessage({
        removeComponents: { surfaceId: 's1', componentIds: ['t1'] },
      });
      expect(result.valid).toBe(true);
    });

    it('validates appendData', () => {
      const result = validateMessage({
        appendData: { surfaceId: 's1', path: '/items', items: [1, 2] },
      });
      expect(result.valid).toBe(true);
    });

    it('validates patchDataModel', () => {
      const result = validateMessage({
        patchDataModel: { surfaceId: 's1', patch: { name: 'test' } },
      });
      expect(result.valid).toBe(true);
    });

    it('rejects null', () => {
      expect(validateMessage(null).valid).toBe(false);
    });

    it('rejects empty object', () => {
      expect(validateMessage({}).valid).toBe(false);
    });

    it('rejects unknown message type', () => {
      const result = validateMessage({ unknownAction: {} });
      expect(result.valid).toBe(false);
      expect(result.errors[0]).toContain('Unknown message type');
    });
  });

  describe('validateComponent', () => {
    it('validates a Chart component', () => {
      const result = validateComponent({
        id: 'c1',
        component: 'Chart',
        chartType: 'bar',
        data: '/chart/data',
      });
      expect(result.valid).toBe(true);
    });

    it('validates all component types', () => {
      const types = ['Chart', 'Timeline', 'KnowledgeGraph', 'Map', 'Media', 'Document', 'Code', 'Artifact', 'Custom'];
      for (const type of types) {
        const result = validateComponent({ id: `${type}-1`, component: type });
        expect(result.valid).toBe(true);
      }
    });

    it('rejects component without id', () => {
      expect(validateComponent({ component: 'Chart' }).valid).toBe(false);
    });

    it('rejects component without component type', () => {
      expect(validateComponent({ id: 'c1' }).valid).toBe(false);
    });

    it('rejects null', () => {
      expect(validateComponent(null).valid).toBe(false);
    });
  });

  describe('type guards', () => {
    it('isA2UIMessage returns true for valid messages', () => {
      expect(isA2UIMessage({ createSurface: { surfaceId: 's1' } })).toBe(true);
    });

    it('isA2UIMessage returns false for invalid', () => {
      expect(isA2UIMessage({ nonsense: {} })).toBe(false);
    });

    it('isA2UIComponent returns true for valid components', () => {
      expect(isA2UIComponent({ id: 'c1', component: 'Code' })).toBe(true);
    });

    it('isA2UIComponent returns false for invalid', () => {
      expect(isA2UIComponent({ name: 'not a component' })).toBe(false);
    });
  });
});
