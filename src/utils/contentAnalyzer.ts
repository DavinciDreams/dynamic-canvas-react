/**
 * Content analyzer for detecting content types
 */

import type { CanvasContentType } from '../types';

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
    const events: any[] = [];

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
   * Analyze content and return appropriate content object
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
}
