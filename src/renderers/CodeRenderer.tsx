import React from 'react';
import { Copy, Check } from 'lucide-react';
import type { CodeContent, Theme } from '../types';

interface CodeRendererProps {
  content: CodeContent;
  theme: Theme;
}

export const CodeRenderer: React.FC<CodeRendererProps> = ({ content, theme }) => {
  const [copied, setCopied] = React.useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(content.code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="code-renderer">
      <div className="code-header">
        <span className="code-language">{content.language}</span>
        {content.filename && (
          <span className="code-filename">{content.filename}</span>
        )}
        <button
          onClick={handleCopy}
          className="code-copy-button"
          style={{ color: theme.colors.primary }}
        >
          {copied ? <Check size={16} /> : <Copy size={16} />}
        </button>
      </div>
      <pre className="code-content">
        <code>{content.code}</code>
      </pre>
    </div>
  );
};
