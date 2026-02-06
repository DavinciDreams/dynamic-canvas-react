/**
 * Custom component schema for A2UI
 * Uses a registry key to resolve to a client-side React component
 */

export interface CustomComponent {
  id: string;
  component: 'Custom';
  /** Key to look up in the client's ComponentRegistry */
  rendererKey: string;
  title?: string;
  props?: Record<string, unknown>;
}
