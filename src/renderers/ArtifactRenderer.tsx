/**
 * ArtifactRenderer — sandboxed HTML/CSS/JS iframe
 */

import React, { useMemo } from 'react';
import type { RendererProps } from '../core/ComponentRegistry';
import type { ArtifactComponent } from '../schema/components/artifact';
import { RendererFrame } from './shared/RendererFrame';

const DEFAULT_SANDBOX = ['allow-scripts'];

const ArtifactRenderer: React.FC<RendererProps<ArtifactComponent>> = ({ component }) => {
  const {
    html = '',
    css = '',
    js = '',
    title,
    sandboxPermissions = DEFAULT_SANDBOX,
    width,
    height = 400,
  } = component;

  const srcdoc = useMemo(() => {
    const parts: string[] = ['<!DOCTYPE html><html><head><meta charset="utf-8">'];
    if (css) {
      parts.push(`<style>${css}</style>`);
    }
    parts.push('</head><body>');
    parts.push(html);
    if (js) {
      parts.push(`<script>${js}<\/script>`);
    }
    parts.push('</body></html>');
    return parts.join('\n');
  }, [html, css, js]);

  const sandbox = sandboxPermissions.join(' ');

  return (
    <RendererFrame title={title}>
      <iframe
        srcDoc={srcdoc}
        sandbox={sandbox}
        style={{
          width: typeof width === 'number' ? `${width}px` : width ?? '100%',
          height: typeof height === 'number' ? `${height}px` : height,
          border: 'none',
          display: 'block',
        }}
        title={title ?? 'Artifact'}
      />
    </RendererFrame>
  );
};

export default ArtifactRenderer;
