/**
 * Content analyzer — detects content types and emits A2UI messages
 */

import type { CanvasContentType } from '../types';
import type { A2UIMessage } from '../schema/a2ui-envelope';

export class ContentAnalyzer {
  /**
   * Detect the content type from a string
   */
  static detectType(content: string): CanvasContentType {
    const trimmed = content.trim();

    // Check for code blocks
    if (trimmed.includes('```') || /[\n\s]*\w+\s*=\s*\{/.test(trimmed)) {
      return 'code';
    }

    // Check for markdown documents
    if (trimmed.includes('#') || trimmed.includes('##')) {
      return 'document';
    }

    // Check for timeline indicators
    if (/\d{4}-\d{2}-\d{2}/.test(trimmed)) {
      return 'timeline';
    }

    // Check for chart indicators
    if (/\d+\s*%|\[\s*\d+\s*,\s*\d+\s*\]/.test(trimmed)) {
      return 'chart';
    }

    return 'custom';
  }

  /**
   * Extract chart data from content
   */
  static extractChartData(content: string) {
    const numbers = content.match(/-?\d+(\.\d+)?/g);
    if (!numbers) return null;

    const parsed = numbers.map(Number);
    const labels = parsed.slice(0, Math.ceil(parsed.length / 2));
    const values = parsed.slice(Math.ceil(parsed.length / 2));

    return {
      labels,
      values
    };
  }

  /**
   * Extract timeline events from content
   */
  static extractTimelineEvents(content: string) {
    const lines = content.split('\n');
    const events: { date: string; title: string; description: string }[] = [];

    lines.forEach((line) => {
      const dateMatch = line.match(/(\d{4}-\d{2}-\d{2})/);
      if (dateMatch) {
        events.push({
          date: dateMatch[1],
          title: line.replace(dateMatch[0], '').trim(),
          description: ''
        });
      }
    });

    return events.length > 0 ? events : null;
  }

  /**
   * Extract code from content
   */
  static extractCode(content: string) {
    const codeBlockMatch = content.match(/```(\w+)?\n([\s\S]*?)```/);
    if (codeBlockMatch) {
      return {
        code: codeBlockMatch[2],
        language: codeBlockMatch[1] || 'text'
      };
    }
    return null;
  }

  /**
   * Analyze content and return appropriate content object (legacy)
   */
  static analyze(content: string): any {
    const type = this.detectType(content);

    switch (type) {
      case 'chart': {
        const data = this.extractChartData(content);
        return {
          type: 'chart',
          data: data || { labels: [], values: [] }
        };
      }
      case 'timeline': {
        const events = this.extractTimelineEvents(content);
        return {
          type: 'timeline',
          events: events || []
        };
      }
      case 'code': {
        const code = this.extractCode(content);
        return {
          type: 'code',
          code: code?.code || content,
          language: code?.language || 'text'
        };
      }
      case 'document': {
        return {
          type: 'document',
          content
        };
      }
      default: {
        return {
          type: 'custom',
          data: content
        };
      }
    }
  }

  /**
   * Analyze content and emit A2UI messages for a surface
   */
  static toA2UIMessages(content: string, surfaceId = 's1'): A2UIMessage[] {
    const type = this.detectType(content);
    const messages: A2UIMessage[] = [
      { createSurface: { surfaceId, catalogId: 'dynamic-canvas/v1' } },
    ];

    switch (type) {
      case 'chart': {
        const data = this.extractChartData(content);
        messages.push({
          updateDataModel: {
            surfaceId,
            path: '/chart/data',
            value: (data?.labels ?? []).map((label, i) => ({
              label: String(label),
              value: data?.values[i] ?? 0,
            })),
          },
        });
        messages.push({
          updateComponents: {
            surfaceId,
            components: [{
              id: 'chart-1',
              component: 'Chart',
              chartType: 'bar',
              data: '/chart/data',
            }],
          },
        });
        break;
      }
      case 'timeline': {
        const events = this.extractTimelineEvents(content);
        messages.push({
          updateDataModel: {
            surfaceId,
            path: '/timeline/events',
            value: events ?? [],
          },
        });
        messages.push({
          updateComponents: {
            surfaceId,
            components: [{
              id: 'timeline-1',
              component: 'Timeline',
              events: '/timeline/events',
            }],
          },
        });
        break;
      }
      case 'code': {
        const code = this.extractCode(content);
        messages.push({
          updateComponents: {
            surfaceId,
            components: [{
              id: 'code-1',
              component: 'Code',
              code: code?.code ?? content,
              language: code?.language ?? 'text',
            }],
          },
        });
        break;
      }
      case 'document': {
        messages.push({
          updateComponents: {
            surfaceId,
            components: [{
              id: 'doc-1',
              component: 'Document',
              content,
              format: 'markdown',
            }],
          },
        });
        break;
      }
      default: {
        messages.push({
          updateComponents: {
            surfaceId,
            components: [{
              id: 'custom-1',
              component: 'Custom',
              rendererKey: 'default',
              props: { content },
            }],
          },
        });
      }
    }

    return messages;
  }
}

/**
 * Compat: convert old CanvasContent format to A2UI messages
 */
export function canvasContentToA2UI(content: { type: string; [key: string]: any }, surfaceId = 's1'): A2UIMessage[] {
  const messages: A2UIMessage[] = [
    { createSurface: { surfaceId, catalogId: 'dynamic-canvas/v1' } },
  ];

  switch (content.type) {
    case 'chart': {
      const data = content.data;
      if (data?.labels && data?.values) {
        const items = data.labels.map((label: string, i: number) => ({
          label,
          value: data.values[i] ?? 0,
        }));
        messages.push({ updateDataModel: { surfaceId, path: '/chart/data', value: items } });
        messages.push({
          updateComponents: {
            surfaceId,
            components: [{
              id: 'chart-1',
              component: 'Chart',
              chartType: content.chartType ?? 'bar',
              data: '/chart/data',
              title: content.title,
              colors: content.options?.colors,
            }],
          },
        });
      }
      break;
    }
    case 'timeline': {
      messages.push({ updateDataModel: { surfaceId, path: '/timeline/events', value: content.events ?? [] } });
      messages.push({
        updateComponents: {
          surfaceId,
          components: [{
            id: 'timeline-1',
            component: 'Timeline',
            events: '/timeline/events',
            title: content.title,
            orientation: content.options?.orientation,
          }],
        },
      });
      break;
    }
    case 'code': {
      messages.push({
        updateComponents: {
          surfaceId,
          components: [{
            id: 'code-1',
            component: 'Code',
            code: content.code ?? '',
            language: content.language ?? 'text',
            filename: content.filename,
            title: content.title,
          }],
        },
      });
      break;
    }
    case 'document': {
      messages.push({
        updateComponents: {
          surfaceId,
          components: [{
            id: 'doc-1',
            component: 'Document',
            content: content.content ?? '',
            format: content.format ?? 'markdown',
            title: content.title,
          }],
        },
      });
      break;
    }
    default: {
      messages.push({
        updateComponents: {
          surfaceId,
          components: [{
            id: 'custom-1',
            component: 'Custom',
            rendererKey: 'default',
            props: content.props ?? { data: content.data },
          }],
        },
      });
    }
  }

  return messages;
}
