/**
 * Artifact component schema for A2UI
 * Renders sandboxed HTML/CSS/JS in an iframe
 */

export interface ArtifactComponent {
  id: string;
  component: 'Artifact';
  /** Combined HTML source (can include inline <style> and <script>) */
  html?: string;
  css?: string;
  js?: string;
  title?: string;
  /** CSP sandbox permissions */
  sandboxPermissions?: string[];
  width?: number | string;
  height?: number | string;
}
