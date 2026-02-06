/**
 * Chart component schema for A2UI
 */

export interface ChartComponentAxis {
  label?: string;
  min?: number;
  max?: number;
  format?: string;
}

export interface ChartComponentSeries {
  name: string;
  dataKey: string;
  color?: string;
  type?: 'bar' | 'line' | 'area';
}

export interface ChartComponent {
  id: string;
  component: 'Chart';
  chartType: 'bar' | 'line' | 'scatter' | 'pie' | 'area' | 'donut' | 'radar' | 'heatmap';
  /** JSON Pointer to data in the surface data model */
  data: string;
  title?: string;
  xAxis?: ChartComponentAxis;
  yAxis?: ChartComponentAxis;
  colors?: string[];
  series?: ChartComponentSeries[];
  threeD?: boolean;
  showLegend?: boolean;
  showGrid?: boolean;
  width?: number | string;
  height?: number | string;
}
