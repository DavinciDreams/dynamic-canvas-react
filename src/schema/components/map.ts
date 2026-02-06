/**
 * Map component schema for A2UI
 */

export interface MapMarker {
  id?: string;
  lat: number;
  lng: number;
  label?: string;
  color?: string;
  icon?: string;
  popup?: string;
}

export interface MapComponent {
  id: string;
  component: 'Map';
  center?: { lat: number; lng: number };
  zoom?: number;
  /** JSON Pointer to markers array in the surface data model */
  markers?: string;
  title?: string;
  baseLayer?: 'satellite' | 'terrain' | 'streets' | 'dark';
  flyTo?: { lat: number; lng: number; zoom?: number; duration?: number };
  terrain?: boolean;
  width?: number | string;
  height?: number | string;
}
