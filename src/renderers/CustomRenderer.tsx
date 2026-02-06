/**
 * CustomRenderer — registry-key based escape hatch
 *
 * Resolves a React component from the ComponentRegistry by rendererKey.
 * For backward compatibility, also supports legacy CustomContent with component prop.
 */

import React from 'react';
import type { RendererProps } from '../core/ComponentRegistry';
import type { CustomComponent } from '../schema/components/custom';
import { RendererFrame } from './shared/RendererFrame';

/** Legacy support */
interface LegacyCustomProps {
  content?: {
    component?: React.ComponentType<any>;
    props?: Record<string, any>;
  };
}

const CustomRenderer: React.FC<RendererProps<CustomComponent> & LegacyCustomProps> = ({
  component,
  data,
  theme,
  content: legacyContent,
}) => {
  const textColor = (theme as { colors?: Record<string, string> })?.colors?.text ?? 'inherit';

  // Legacy mode: render the component directly
  if (legacyContent?.component) {
    const LegacyComponent = legacyContent.component;
    return (
      <div className="custom-renderer" style={{ color: textColor }}>
        <LegacyComponent {...(legacyContent.props ?? {})} />
      </div>
    );
  }

  // A2UI mode: the rendererKey resolution is handled by RendererResolver.
  // If we get here, it means we're the fallback Custom renderer.
  const title = component?.title;

  return (
    <RendererFrame title={title}>
      <div style={{ padding: '16px', color: textColor }}>
        {data ? (
          <pre style={{ fontSize: '13px', margin: 0, whiteSpace: 'pre-wrap' }}>
            {typeof data === 'string' ? data : JSON.stringify(data, null, 2)}
          </pre>
        ) : (
          <p style={{ opacity: 0.5 }}>
            Custom component: {component?.rendererKey ?? 'unknown'}
          </p>
        )}
      </div>
    </RendererFrame>
  );
};

export default CustomRenderer;
export { CustomRenderer };
