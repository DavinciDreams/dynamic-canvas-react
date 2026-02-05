/**
 * Example usage of @dynamic-canvas/react
 * 
 * This file demonstrates how to use the Dynamic Canvas library
 */

import React, { useState } from 'react';
import { CanvasProvider, useCanvas, themes, ChartRenderer, TimelineRenderer, CodeRenderer, DocumentRenderer, ContentAnalyzer } from '../src';

// Example 1: Basic Chart Rendering
function ChartExample() {
  const { content, setContent } = useCanvas();

  const chartData = {
    type: 'chart',
    chartType: 'bar',
    data: {
      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
      values: [10, 25, 18, 30, 22, 35]
    },
    options: {
      colors: ['#0ea5e9', '#6366f1', '#8b5cf6', '#ec4899', '#f43f5e', '#f97316']
    }
  };

  return (
    <div className="example-container">
      <h3>Chart Example</h3>
      <ChartRenderer content={chartData} theme={themes.dark} />
    </div>
  );
}

// Example 2: Timeline Rendering
function TimelineExample() {
  const { content, setContent } = useCanvas();

  const timelineData = {
    type: 'timeline',
    events: [
      {
        date: '2024-01-15',
        title: 'Project Kickoff',
        description: 'Initial planning and team formation'
      },
      {
        date: '2024-02-01',
        title: 'Development Phase',
        description: 'Core features implementation'
      },
      {
        date: '2024-03-15',
        title: 'Beta Release',
        description: 'Internal testing and feedback'
      },
      {
        date: '2024-04-01',
        title: 'Public Launch',
        description: 'Product goes live'
      }
    ]
  };

  return (
    <div className="example-container">
      <h3>Timeline Example</h3>
      <TimelineRenderer content={timelineData} theme={themes.dark} />
    </div>
  );
}

// Example 3: Code Rendering
function CodeExample() {
  const { content, setContent } = useCanvas();

  const codeData = {
    type: 'code',
    code: `function greet(name) {
  return \`Hello, \${name}!\`;
}

console.log(greet('World'));`,
    language: 'javascript',
    filename: 'greeting.js'
  };

  return (
    <div className="example-container">
      <h3>Code Example</h3>
      <CodeRenderer content={codeData} theme={themes.dark} />
    </div>
  );
}

// Example 4: Document Rendering
function DocumentExample() {
  const { content, setContent } = useCanvas();

  const documentData = {
    type: 'document',
    content: `# Welcome to Dynamic Canvas

This is a markdown document rendered in the canvas component.

## Features

- Multiple content types
- Theme support
- Responsive design

## Getting Started

Install the package and start building amazing visualizations!`,
    format: 'markdown'
  };

  return (
    <div className="example-container">
      <h3>Document Example</h3>
      <DocumentRenderer content={documentData} theme={themes.dark} />
    </div>
  );
}

// Example 5: Dynamic Content Analysis
function DynamicContentExample() {
  const { content, setContent } = useCanvas();

  const [inputText, setInputText] = useState('');

  const handleAnalyze = () => {
    const analyzed = ContentAnalyzer.analyze(inputText);
    setContent(analyzed);
  };

  return (
    <div className="example-container">
      <h3>Dynamic Content Analysis</h3>
      <textarea
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
        placeholder="Type something to analyze..."
        style={{ width: '100%', height: '100px', marginBottom: '10px' }}
      />
      <button onClick={handleAnalyze} style={{ padding: '8px 16px' }}>
        Analyze Content
      </button>
      {content && <ChartRenderer content={content} theme={themes.dark} />}
    </div>
  );
}

// Example 6: Full Chat Integration
function ChatIntegrationExample() {
  const { content, setContent } = useCanvas();

  const responses = [
    {
      text: "Here's a sales breakdown for Q1: January: 10%, February: 25%, March: 18%",
      content: {
        type: 'chart',
        chartType: 'bar',
        data: {
          labels: ['Jan', 'Feb', 'Mar'],
          values: [10, 25, 18]
        }
      }
    },
    {
      text: "Here's our project timeline:\n- 2024-01-01: Project Started\n- 2024-02-15: Development Phase\n- 2024-04-01: Launch",
      content: {
        type: 'timeline',
        events: [
          { date: '2024-01-01', title: 'Project Started' },
          { date: '2024-02-15', title: 'Development Phase' },
          { date: '2024-04-01', title: 'Launch' }
        ]
      }
    },
    {
      text: "Here's a JavaScript function:\n\`\`\`javascript\nfunction add(a, b) {\n  return a + b;\n}\n\`\`\`",
      content: {
        type: 'code',
        code: 'function add(a, b) {\n  return a + b;\n}',
        language: 'javascript'
      }
    }
  ];

  const [selectedIndex, setSelectedIndex] = useState(0);

  return (
    <div className="chat-example">
      <div className="chat-messages">
        {responses.map((response, index) => (
          <button
            key={index}
            onClick={() => setSelectedIndex(index)}
            style={{
              padding: '8px',
              margin: '4px 0',
              background: selectedIndex === index ? '#0ea5e9' : '#1e293b',
              color: '#fff',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              textAlign: 'left'
            }}
          >
            {response.text.substring(0, 50)}...
          </button>
        ))}
      </div>
      <div className="chat-content">
        <ChartRenderer content={responses[selectedIndex].content} theme={themes.dark} />
      </div>
    </div>
  );
}

// Main Example Component
function ExampleApp() {
  return (
    <CanvasProvider theme={themes.dark}>
      <div style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto' }}>
        <h1 style={{ color: 'white', marginBottom: '20px' }}>
          @dynamic-canvas/react Examples
        </h1>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px' }}>
          <ChartExample />
          <TimelineExample />
          <CodeExample />
          <DocumentExample />
          <DynamicContentExample />
          <ChatIntegrationExample />
        </div>
      </div>
    </CanvasProvider>
  );
}

export default ExampleApp;
