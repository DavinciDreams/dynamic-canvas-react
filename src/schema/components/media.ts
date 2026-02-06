/**
 * Media component schema for A2UI
 */

export interface MediaComponent {
  id: string;
  component: 'Media';
  mediaType: 'image' | 'video' | 'audio';
  src: string;
  alt?: string;
  caption?: string;
  title?: string;
  controls?: boolean;
  autoplay?: boolean;
  loop?: boolean;
  muted?: boolean;
  fit?: 'contain' | 'cover' | 'fill' | 'none' | 'scale-down';
  width?: number | string;
  height?: number | string;
}
