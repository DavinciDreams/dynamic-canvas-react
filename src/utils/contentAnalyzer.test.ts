import { describe, it, expect } from 'vitest';
import { ContentAnalyzer, canvasContentToA2UI } from './contentAnalyzer';

describe('ContentAnalyzer', () => {
  describe('detectType', () => {
    it('detects code blocks', () => {
      expect(ContentAnalyzer.detectType('```js\nconsole.log("hi")\n```')).toBe('code');
    });

    it('detects markdown documents', () => {
      expect(ContentAnalyzer.detectType('# Hello World\nSome text')).toBe('document');
    });

    it('detects timeline content', () => {
      expect(ContentAnalyzer.detectType('2024-01-01 Project Start\n2024-06-01 Midpoint')).toBe('timeline');
    });

    it('detects chart content', () => {
      expect(ContentAnalyzer.detectType('Sales: 45%\nMarketing: 30%')).toBe('chart');
    });

    it('defaults to custom for unknown', () => {
      expect(ContentAnalyzer.detectType('just some random text')).toBe('custom');
    });
  });

  describe('extractCode', () => {
    it('extracts code from markdown code block', () => {
      const result = ContentAnalyzer.extractCode('```python\nprint("hello")\n```');
      expect(result).toEqual({ code: 'print("hello")\n', language: 'python' });
    });

    it('returns null for no code block', () => {
      expect(ContentAnalyzer.extractCode('just text')).toBeNull();
    });
  });

  describe('extractTimelineEvents', () => {
    it('extracts events from date-prefixed lines', () => {
      const events = ContentAnalyzer.extractTimelineEvents('2024-01-01 Start\n2024-12-31 End');
      expect(events).toHaveLength(2);
      expect(events![0].date).toBe('2024-01-01');
      expect(events![0].title).toBe('Start');
    });

    it('returns null for no events', () => {
      expect(ContentAnalyzer.extractTimelineEvents('no dates here')).toBeNull();
    });
  });

  describe('analyze (legacy)', () => {
    it('analyzes code content', () => {
      const result = ContentAnalyzer.analyze('```js\nconst x = 1;\n```');
      expect(result.type).toBe('code');
      expect(result.code).toContain('const x = 1;');
    });

    it('analyzes document content', () => {
      const result = ContentAnalyzer.analyze('# Title\nBody text');
      expect(result.type).toBe('document');
    });
  });

  describe('toA2UIMessages', () => {
    it('creates A2UI messages for code content', () => {
      const msgs = ContentAnalyzer.toA2UIMessages('```python\nprint("hi")\n```');
      expect(msgs.length).toBeGreaterThanOrEqual(2);
      expect(msgs[0]).toHaveProperty('createSurface');
      // Find the updateComponents message
      const compMsg = msgs.find((m) => 'updateComponents' in m);
      expect(compMsg).toBeDefined();
      const comps = (compMsg as any).updateComponents.components;
      expect(comps[0].component).toBe('Code');
    });

    it('creates A2UI messages for timeline content', () => {
      const msgs = ContentAnalyzer.toA2UIMessages('2024-01-01 Start\n2024-06-01 Mid');
      const dataMsg = msgs.find((m) => 'updateDataModel' in m);
      expect(dataMsg).toBeDefined();
      const compMsg = msgs.find((m) => 'updateComponents' in m);
      expect((compMsg as any).updateComponents.components[0].component).toBe('Timeline');
    });

    it('creates A2UI messages for document content', () => {
      const msgs = ContentAnalyzer.toA2UIMessages('# Hello');
      const compMsg = msgs.find((m) => 'updateComponents' in m);
      expect((compMsg as any).updateComponents.components[0].component).toBe('Document');
    });

    it('uses custom surface id', () => {
      const msgs = ContentAnalyzer.toA2UIMessages('test', 'my-surface');
      expect((msgs[0] as any).createSurface.surfaceId).toBe('my-surface');
    });
  });

  describe('canvasContentToA2UI', () => {
    it('converts chart content to A2UI', () => {
      const msgs = canvasContentToA2UI({
        type: 'chart',
        data: { labels: ['Jan', 'Feb'], values: [10, 20] },
        chartType: 'bar',
      });
      expect(msgs[0]).toHaveProperty('createSurface');
      const dataMsg = msgs.find((m) => 'updateDataModel' in m);
      expect(dataMsg).toBeDefined();
    });

    it('converts code content to A2UI', () => {
      const msgs = canvasContentToA2UI({
        type: 'code',
        code: 'console.log(1)',
        language: 'javascript',
      });
      const compMsg = msgs.find((m) => 'updateComponents' in m) as any;
      expect(compMsg.updateComponents.components[0].component).toBe('Code');
      expect(compMsg.updateComponents.components[0].code).toBe('console.log(1)');
    });

    it('converts timeline content to A2UI', () => {
      const msgs = canvasContentToA2UI({
        type: 'timeline',
        events: [{ date: '2024-01-01', title: 'Start' }],
      });
      const compMsg = msgs.find((m) => 'updateComponents' in m) as any;
      expect(compMsg.updateComponents.components[0].component).toBe('Timeline');
    });

    it('converts document content to A2UI', () => {
      const msgs = canvasContentToA2UI({
        type: 'document',
        content: '# Hello',
        format: 'markdown',
      });
      const compMsg = msgs.find((m) => 'updateComponents' in m) as any;
      expect(compMsg.updateComponents.components[0].component).toBe('Document');
    });

    it('converts unknown type to Custom', () => {
      const msgs = canvasContentToA2UI({ type: 'unknown', data: 'x' });
      const compMsg = msgs.find((m) => 'updateComponents' in m) as any;
      expect(compMsg.updateComponents.components[0].component).toBe('Custom');
    });
  });
});
