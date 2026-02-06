/**
 * MediaRenderer — native <img>, <video>, <audio> elements
 */

import React from 'react';
import type { RendererProps } from '../core/ComponentRegistry';
import type { MediaComponent } from '../schema/components/media';
import { RendererFrame } from './shared/RendererFrame';

const MediaRenderer: React.FC<RendererProps<MediaComponent>> = ({ component }) => {
  const {
    mediaType,
    src,
    alt,
    caption,
    title,
    controls = true,
    autoplay = false,
    loop = false,
    muted = false,
    fit = 'contain',
    width,
    height,
  } = component;

  const sizeStyle: React.CSSProperties = {
    width: typeof width === 'number' ? `${width}px` : width ?? '100%',
    height: typeof height === 'number' ? `${height}px` : height,
    maxWidth: '100%',
  };

  const renderMedia = () => {
    switch (mediaType) {
      case 'image':
        return (
          <img
            src={src}
            alt={alt ?? title ?? ''}
            style={{ ...sizeStyle, objectFit: fit, display: 'block' }}
          />
        );
      case 'video':
        return (
          <video
            src={src}
            controls={controls}
            autoPlay={autoplay}
            loop={loop}
            muted={muted}
            style={{ ...sizeStyle, objectFit: fit, display: 'block' }}
          >
            {alt}
          </video>
        );
      case 'audio':
        return (
          <audio
            src={src}
            controls={controls}
            autoPlay={autoplay}
            loop={loop}
            muted={muted}
            style={{ width: sizeStyle.width }}
          />
        );
      default:
        return <p>Unsupported media type: {mediaType}</p>;
    }
  };

  return (
    <RendererFrame title={title}>
      <div style={{ padding: mediaType === 'audio' ? '12px' : 0 }}>
        {renderMedia()}
        {caption && (
          <p style={{ padding: '8px 12px', fontSize: '13px', opacity: 0.7, margin: 0 }}>
            {caption}
          </p>
        )}
      </div>
    </RendererFrame>
  );
};

export default MediaRenderer;
