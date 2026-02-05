import React, { useEffect, useRef } from 'react';
import type { ChartContent, Theme } from '../types';

interface ChartRendererProps {
  content: ChartContent;
  theme: Theme;
}

export const ChartRenderer: React.FC<ChartRendererProps> = ({ content, theme }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const { data, options = {} } = content;
    const { colors = [] } = options;

    const width = canvas.width;
    const height = canvas.height;
    const padding = 40;

    const barWidth = (width - padding * 2) / data.labels.length - 10;
    const maxValue = Math.max(...data.values, 1);

    data.values.forEach((value, index) => {
      const barHeight = (value / maxValue) * (height - padding * 2);
      const x = padding + index * (barWidth + 10);
      const y = height - padding - barHeight;

      ctx.fillStyle = colors[index % colors.length] || theme.colors.primary;
      ctx.fillRect(x, y, barWidth, barHeight);

      ctx.fillStyle = theme.colors.text;
      ctx.font = '12px sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText(data.labels[index], x + barWidth / 2, height - padding + 20);

      ctx.fillStyle = theme.colors.muted;
      ctx.fillText(value.toString(), x + barWidth / 2, y - 10);
    });

    ctx.strokeStyle = theme.colors.border;
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(padding, padding);
    ctx.lineTo(padding, height - padding);
    ctx.lineTo(width - padding, height - padding);
    ctx.stroke();
  }, [content, theme]);

  return (
    <div className="chart-renderer">
      <canvas
        ref={canvasRef}
        width={600}
        height={300}
        style={{ width: '100%', height: 'auto' }}
      />
    </div>
  );
};
