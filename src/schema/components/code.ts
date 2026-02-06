/**
 * Code component schema for A2UI
 */

export interface CodeComponent {
  id: string;
  component: 'Code';
  code: string;
  language?: string;
  title?: string;
  filename?: string;
  highlightLines?: number[];
  showLineNumbers?: boolean;
  showCopyButton?: boolean;
}
