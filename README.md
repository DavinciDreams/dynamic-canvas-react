# @dynamic-canvas/react

A modular, reusable dynamic canvas component for React that renders conversation-driven visuals alongside 3D avatars in chat applications.

## Features

- **Multiple Content Types**: Support for charts, timelines, code, documents, and custom components
- **Theme System**: Built-in light/dark themes with full customization options
- **Content Analysis**: Automatic content type detection from text
- **Extensible**: Easy to add new renderers and themes
- **Type Safe**: Full TypeScript support
- **Responsive**: Works on all screen sizes

## Installation

```bash
npm install @dynamic-canvas/react
# or
yarn add @dynamic-canvas/react
# or
pnpm add @dynamic-canvas/react
```

## Quick Start

```tsx
import { CanvasProvider, useCanvas, themes } from '@dynamic-canvas/react';

function App() {
  const { content, setContent } = useCanvas();

  return (
    <CanvasProvider theme={themes.dark}>
      <div className="flex h-screen">
        <div className="w-3/4">
          {/* Your main app content */}
        </div>
        <CanvasContainer theme={themes.dark}>
          {content && (
            <ContentRenderer content={content} theme={themes.dark} />
          )}
        </CanvasContainer>
      </div>
    </CanvasProvider>
  );
}
```

## Usage

### Basic Usage

```tsx
import { CanvasProvider, useCanvas, themes, ChartRenderer } from '@dynamic-canvas/react';

function App() {
  const { content, setContent } = useCanvas();

  const handleResponse = (response: string) => {
    const analyzed = ContentAnalyzer.analyze(response);
    setContent(analyzed);
  };

  return (
    <CanvasProvider theme={themes.dark}>
      <div className="flex h-screen">
        <div className="w-3/4">
          {/* Chat interface */}
        </div>
        <div className="w-1/3">
          {content && (
            <ChartRenderer content={content} theme={themes.dark} />
          )}
        </div>
      </div>
    </CanvasProvider>
  );
}
```

### Chart Content

```tsx
const chartContent = {
  type: 'chart',
  chartType: 'bar',
  data: {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May'],
    values: [10, 25, 18, 30, 22]
  },
  options: {
    colors: ['#0ea5e9', '#6366f1', '#8b5cf6', '#ec4899', '#f43f5e']
  }
};

setContent(chartContent);
```

### Timeline Content

```tsx
const timelineContent = {
  type: 'timeline',
  events: [
    {
      date: '2024-01-15',
      title: 'Project Started',
      description: 'Initial planning and requirements gathering'
    },
    {
      date: '2024-02-01',
      title: 'Development Phase',
      description: 'Core features implementation'
    }
  ]
};
```

### Code Content

```tsx
const codeContent = {
  type: 'code',
  code: 'console.log("Hello, World!");',
  language: 'javascript',
  filename: 'app.js'
};
```

### Document Content

```tsx
const documentContent = {
  type: 'document',
  content: '# Welcome\n\nThis is a document rendered in the canvas.',
  format: 'markdown'
};
```

## API Reference

### CanvasProvider

Provides context for the canvas component.

```tsx
<CanvasProvider
  initialTheme={themes.dark}
  initialThemeMode="dark"
  initialContent={initialContent}
>
  {children}
</CanvasProvider>
```

**Props:**
- `initialTheme`: Initial theme object (default: `defaultTheme`)
- `initialThemeMode`: Initial theme mode ('light' | 'dark' | 'system')
- `initialContent`: Initial canvas content

### useCanvas

Hook for accessing canvas state.

```tsx
const { content, setContent, theme, setTheme } = useCanvas();
```

**Returns:**
- `content`: Current canvas content
- `setContent`: Function to set content
- `theme`: Current theme
- `setTheme`: Function to set theme

### useCanvasContent

Hook specifically for content management.

```tsx
const { content, setContent } = useCanvasContent();
```

### useCanvasLayout

Hook for layout management.

```tsx
const { layout, widthRatio, setLayout, setWidthRatio } = useCanvasLayout();
```

### Renderers

#### ChartRenderer

```tsx
<ChartRenderer
  content={chartContent}
  theme={themes.dark}
/>
```

#### TimelineRenderer

```tsx
<TimelineRenderer
  content={timelineContent}
  theme={themes.dark}
/>
```

#### CodeRenderer

```tsx
<CodeRenderer
  content={codeContent}
  theme={themes.dark}
/>
```

#### DocumentRenderer

```tsx
<DocumentRenderer
  content={documentContent}
  theme={themes.dark}
/>
```

#### CustomRenderer

```tsx
const CustomComponent = ({ data }) => <div>{data}</div>;

const customContent = {
  type: 'custom',
  component: CustomComponent,
  props: { data: 'Hello' }
};

<CustomRenderer content={customContent} theme={themes.dark} />
```

## Theming

### Default Themes

```tsx
import { themes } from '@dynamic-canvas/react';

// Use built-in themes
<CanvasProvider theme={themes.light}>
  {/* Light theme */}
</CanvasProvider>

<CanvasProvider theme={themes.dark}>
  {/* Dark theme */}
</CanvasProvider>
```

### Custom Theme

```tsx
const customTheme = {
  colors: {
    background: '#ffffff',
    surface: '#f8fafc',
    primary: '#0ea5e9',
    secondary: '#6366f1',
    text: '#0f172a',
    muted: '#64748b',
    border: '#e2e8f0',
    highlight: '#f1f5f9'
  },
  spacing: {
    xs: '4px',
    sm: '8px',
    md: '16px',
    lg: '24px',
    xl: '32px'
  },
  typography: {
    font: 'Inter, sans-serif',
    sizes: {
      xs: '12px',
      sm: '14px',
      md: '16px',
      lg: '18px',
      xl: '20px'
    },
    weights: {
      normal: 400,
      medium: 500,
      bold: 700
    }
  },
  borderRadius: {
    sm: '4px',
    md: '8px',
    lg: '12px',
    xl: '16px'
  },
  shadows: {
    sm: '0 1px 2px rgba(0,0,0,0.05)',
    md: '0 4px 6px rgba(0,0,0,0.1)',
    lg: '0 10px 15px rgba(0,0,0,0.1)'
  }
};

<CanvasProvider theme={customTheme}>
  {/* Custom theme */}
</CanvasProvider>
```

## Content Analysis

The `ContentAnalyzer` class automatically detects content types:

```tsx
import { ContentAnalyzer } from '@dynamic-canvas/react';

const response = "Sales: 50%, Growth: 25%";
const analyzed = ContentAnalyzer.analyze(response);
// Returns: { type: 'chart', data: { labels: ['50', '25'], values: [] } }
```

## Content Types

| Type | Description | Renderer |
|------|-------------|----------|
| `chart` | Data visualizations | `ChartRenderer` |
| `timeline` | Timeline events | `TimelineRenderer` |
| `code` | Code snippets | `CodeRenderer` |
| `document` | Documents | `DocumentRenderer` |
| `custom` | Custom components | `CustomRenderer` |

## Dependencies

**Core Dependencies:**
- `react`: ^18.0.0
- `react-dom`: ^18.0.0
- `framer-motion`: ^11.0.0
- `lucide-react`: ^0.400.0
- `zustand`: ^5.0.0

**Optional Dependencies:**
- `d3`: ^7.9.0 (for enhanced charts)
- `react-syntax-highlighter`: ^15.5.0 (for code highlighting)
- `react-pdf`: ^7.7.0 (for PDF rendering)
- `markdown-it`: ^14.0.0 (for markdown rendering)

## Extending

### Adding a New Renderer

```tsx
// src/renderers/VideoRenderer.tsx
import React from 'react';
import type { Theme } from '../types';

interface VideoRendererProps {
  content: any;
  theme: Theme;
}

export const VideoRenderer: React.FC<VideoRendererProps> = ({ content, theme }) => {
  return (
    <div style={{ color: theme.colors.text }}>
      <video src={content.url} controls />
    </div>
  );
};

// Export and register
export { VideoRenderer };
```

### Adding a New Theme

```tsx
// src/themes/customTheme.ts
import type { Theme } from '../types';
import { defaultTheme } from './defaultTheme';

export const customTheme: Theme = {
  ...defaultTheme,
  colors: {
    ...defaultTheme.colors,
    primary: '#ff6b6b'
  }
};
```

## License

MIT

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.
