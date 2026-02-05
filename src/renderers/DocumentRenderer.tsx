import React from 'react';
import type { DocumentContent, Theme } from '../types';

interface DocumentRendererProps {
  content: DocumentContent;
  theme: Theme;
}

export const DocumentRenderer: React.FC<DocumentRendererProps> = ({ content, theme }) => {
  return (
    <div className="document-renderer">
      <div className="document-content">
        <h3 className="document-title" style={{ color: theme.colors.text }}>
          {content.title}
        </h3>
        <div className="document-body" style={{ color: theme.colors.text }}>
          {content.content}
        </div>
      </div>
    </div>
  );
};
