import React from 'react';
import type { CustomContent, Theme } from '../types';

interface CustomRendererProps {
  content: CustomContent;
  theme: Theme;
}

export const CustomRenderer: React.FC<CustomRendererProps> = ({ content, theme }) => {
  const { component: CustomComponent, props = {} } = content;

  if (!CustomComponent) {
    return (
      <div className="custom-renderer" style={{ color: theme.colors.text }}>
        <p>No custom component provided</p>
      </div>
    );
  }

  return (
    <div className="custom-renderer" style={{ color: theme.colors.text }}>
      <CustomComponent {...props} />
    </div>
  );
};
