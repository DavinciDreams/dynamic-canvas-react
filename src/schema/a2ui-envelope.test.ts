import { describe, it, expect } from 'vitest';
import { getMessageType } from './a2ui-envelope';

describe('getMessageType', () => {
  it('identifies createSurface', () => {
    expect(getMessageType({ createSurface: { surfaceId: 's1' } })).toBe('createSurface');
  });

  it('identifies destroySurface', () => {
    expect(getMessageType({ destroySurface: { surfaceId: 's1' } })).toBe('destroySurface');
  });

  it('identifies updateDataModel', () => {
    expect(getMessageType({ updateDataModel: { surfaceId: 's1', path: '/', value: 1 } })).toBe('updateDataModel');
  });

  it('identifies updateComponents', () => {
    expect(getMessageType({ updateComponents: { surfaceId: 's1', components: [] } })).toBe('updateComponents');
  });

  it('identifies removeComponents', () => {
    expect(getMessageType({ removeComponents: { surfaceId: 's1', componentIds: [] } })).toBe('removeComponents');
  });

  it('identifies appendData', () => {
    expect(getMessageType({ appendData: { surfaceId: 's1', path: '/', items: [] } })).toBe('appendData');
  });

  it('identifies patchDataModel', () => {
    expect(getMessageType({ patchDataModel: { surfaceId: 's1', patch: {} } })).toBe('patchDataModel');
  });

  it('returns unknown for unrecognized', () => {
    expect(getMessageType({ randomThing: {} } as any)).toBe('unknown');
  });
});
