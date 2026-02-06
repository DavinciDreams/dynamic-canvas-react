/**
 * ComponentRegistry — maps A2UI component type strings to React renderers
 *
 * Built-in renderers are registered by default. Custom renderers can be
 * registered at runtime for the 'Custom' component type.
 */

import type { ComponentType } from 'react';
import type { A2UIComponentType } from '../schema/component-types';

/** Props that every renderer receives */
export interface RendererProps<T = Record<string, unknown>> {
  component: T;
  data: unknown;
  theme?: unknown;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type RendererComponent = ComponentType<any>;
type RendererFactory = () => Promise<{ default: RendererComponent }>;

interface RegistryEntry {
  /** Lazy factory for code-splitting */
  factory: RendererFactory;
  /** Resolved component (cached after first load) */
  resolved?: RendererComponent;
}

export class ComponentRegistry {
  private renderers = new Map<string, RegistryEntry>();
  private customRenderers = new Map<string, RegistryEntry>();

  /** Register a built-in renderer (lazy-loaded) */
  register(componentType: A2UIComponentType, factory: RendererFactory): void {
    this.renderers.set(componentType, { factory });
  }

  /** Register a custom renderer by key */
  registerCustom(rendererKey: string, factory: RendererFactory): void {
    this.customRenderers.set(rendererKey, { factory });
  }

  /** Register a custom renderer with an already-resolved component */
  registerCustomSync(rendererKey: string, component: RendererComponent): void {
    this.customRenderers.set(rendererKey, {
      factory: async () => ({ default: component }),
      resolved: component,
    });
  }

  /** Get the renderer for a component type (lazy loads on first access) */
  async resolve(componentType: string, rendererKey?: string): Promise<RendererComponent | null> {
    // For Custom components, look up by rendererKey
    if (componentType === 'Custom' && rendererKey) {
      const custom = this.customRenderers.get(rendererKey);
      if (!custom) return null;
      if (custom.resolved) return custom.resolved;
      const mod = await custom.factory();
      custom.resolved = mod.default;
      return custom.resolved;
    }

    const entry = this.renderers.get(componentType);
    if (!entry) return null;
    if (entry.resolved) return entry.resolved;
    const mod = await entry.factory();
    entry.resolved = mod.default;
    return entry.resolved;
  }

  /** Check if a component type has a registered renderer */
  has(componentType: string): boolean {
    return this.renderers.has(componentType);
  }

  /** Check if a custom renderer key is registered */
  hasCustom(rendererKey: string): boolean {
    return this.customRenderers.has(rendererKey);
  }

  /** Get all registered component types */
  getRegisteredTypes(): string[] {
    return Array.from(this.renderers.keys());
  }

  /** Get all registered custom renderer keys */
  getCustomKeys(): string[] {
    return Array.from(this.customRenderers.keys());
  }
}

/** Create a registry with built-in renderers pre-registered */
export function createDefaultRegistry(): ComponentRegistry {
  const registry = new ComponentRegistry();

  registry.register('Chart', () => import('../renderers/ChartRenderer'));
  registry.register('Timeline', () => import('../renderers/TimelineRenderer'));
  registry.register('KnowledgeGraph', () => import('../renderers/KnowledgeGraphRenderer'));
  registry.register('Map', () => import('../renderers/MapRenderer'));
  registry.register('Media', () => import('../renderers/MediaRenderer'));
  registry.register('Document', () => import('../renderers/DocumentRenderer'));
  registry.register('Code', () => import('../renderers/CodeRenderer'));
  registry.register('Artifact', () => import('../renderers/ArtifactRenderer'));
  registry.register('Custom', () => import('../renderers/CustomRenderer'));

  return registry;
}
