/**
 * Timeline component schema for A2UI
 */

export interface TimelineComponentEvent {
  id?: string;
  date: string;
  title: string;
  description?: string;
  icon?: string;
  color?: string;
  group?: string;
  link?: string;
}

export interface TimelineComponent {
  id: string;
  component: 'Timeline';
  /** JSON Pointer to events array in the surface data model */
  events: string;
  title?: string;
  orientation?: 'horizontal' | 'vertical';
  layout?: 'default' | 'alternating' | 'grouped';
  groupBy?: string;
  zoomable?: boolean;
  showDates?: boolean;
  showDescriptions?: boolean;
  compact?: boolean;
}
