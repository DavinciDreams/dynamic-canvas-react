/**
 * RendererResolver — Suspense + ErrorBoundary wrapper that lazy-loads
 * the correct renderer for each A2UI component.
 */

import React, { Suspense, useEffect, useState } from 'react';
import type { A2UIComponent } from '../schema/component-types';
import type { ComponentRegistry } from './ComponentRegistry';
import { ErrorBoundary } from './ErrorBoundary';

interface RendererResolverProps {
  component: A2UIComponent;
  data: unknown;
  registry: ComponentRegistry;
  theme?: unknown;
  onError?: (error: Error) => void;
  loadingFallback?: React.ReactNode;
}

const DefaultLoading: React.FC = () => (
  <div style={{ padding: '16px', opacity: 0.5, fontSize: '14px' }}>Loading renderer...</div>
);

export const RendererResolver: React.FC<RendererResolverProps> = ({
  component,
  data,
  registry,
  theme,
  onError,
  loadingFallback,
}) => {
  const [Renderer, setRenderer] = useState<React.ComponentType<any> | null>(null);
  const [resolveError, setResolveError] = useState<Error | null>(null);

  useEffect(() => {
    let cancelled = false;

    const rendererKey = component.component === 'Custom'
      ? (component as { rendererKey?: string }).rendererKey
      : undefined;

    registry
      .resolve(component.component, rendererKey)
      .then((resolved) => {
        if (!cancelled) {
          if (resolved) {
            setRenderer(() => resolved);
          } else {
            setResolveError(new Error(`No renderer found for component type: ${component.component}${rendererKey ? ` (key: ${rendererKey})` : ''}`));
          }
        }
      })
      .catch((err) => {
        if (!cancelled) {
          setResolveError(err instanceof Error ? err : new Error(String(err)));
        }
      });

    return () => { cancelled = true; };
  }, [component.component, registry]);

  if (resolveError) {
    return (
      <div style={{ padding: '16px', color: '#ef4444', fontSize: '14px' }}>
        {resolveError.message}
      </div>
    );
  }

  if (!Renderer) {
    return <>{loadingFallback ?? <DefaultLoading />}</>;
  }

  return (
    <ErrorBoundary onError={onError}>
      <Suspense fallback={loadingFallback ?? <DefaultLoading />}>
        <Renderer component={component} data={data} theme={theme} />
      </Suspense>
    </ErrorBoundary>
  );
};

export default RendererResolver;
