/**
 * Document component schema for A2UI
 */

export interface DocumentComponent {
  id: string;
  component: 'Document';
  /** Markdown or HTML content string, or JSON Pointer to content in data model */
  content: string;
  title?: string;
  format?: 'markdown' | 'html';
  toc?: boolean;
}
