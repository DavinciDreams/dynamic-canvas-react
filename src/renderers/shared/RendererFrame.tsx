/**
 * RendererFrame — common chrome (title bar, actions) for renderers
 */

import React from 'react';

interface RendererFrameProps {
  title?: string;
  children: React.ReactNode;
  actions?: React.ReactNode;
  style?: React.CSSProperties;
}

export const RendererFrame: React.FC<RendererFrameProps> = ({
  title,
  children,
  actions,
  style,
}) => {
  return (
    <div style={{ borderRadius: '8px', overflow: 'hidden', border: '1px solid rgba(128,128,128,0.2)', ...style }}>
      {(title || actions) && (
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '8px 12px',
          borderBottom: '1px solid rgba(128,128,128,0.2)',
          fontSize: '13px',
          fontWeight: 500,
          background: 'rgba(128,128,128,0.05)',
        }}>
          <span>{title}</span>
          {actions && <div style={{ display: 'flex', gap: '4px' }}>{actions}</div>}
        </div>
      )}
      <div>{children}</div>
    </div>
  );
};

export default RendererFrame;
