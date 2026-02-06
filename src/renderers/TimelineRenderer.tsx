/**
 * TimelineRenderer — rich timeline with alternating/grouped/zoomable layouts
 *
 * A2UI-native: reads events from the surface data model via JSON Pointer.
 * Also supports legacy TimelineContent for backward compatibility.
 */

import React, { useMemo } from 'react';
import type { RendererProps } from '../core/ComponentRegistry';
import type { TimelineComponent, TimelineComponentEvent } from '../schema/components/timeline';
import { RendererFrame } from './shared/RendererFrame';

/** Legacy support: also accept old-style props */
interface LegacyTimelineProps {
  content?: { events?: TimelineComponentEvent[]; options?: { orientation?: string } };
}

const TimelineRenderer: React.FC<RendererProps<TimelineComponent> & LegacyTimelineProps> = ({
  component,
  data,
  theme,
  content: legacyContent,
}) => {
  // Resolve events: from data model pointer or legacy content
  const events: TimelineComponentEvent[] = useMemo(() => {
    if (component?.events && data) {
      // data is already resolved by the parent
      if (Array.isArray(data)) return data as TimelineComponentEvent[];
    }
    if (legacyContent?.events) return legacyContent.events;
    return [];
  }, [component, data, legacyContent]);

  const orientation = component?.orientation ?? legacyContent?.options?.orientation ?? 'vertical';
  const layout = component?.layout ?? 'default';
  const title = component?.title;
  const showDates = component?.showDates !== false;
  const showDescriptions = component?.showDescriptions !== false;
  const groupBy = component?.groupBy;

  // Group events if requested
  const groupedEvents = useMemo(() => {
    if (!groupBy && layout !== 'grouped') return null;
    const groups = new Map<string, TimelineComponentEvent[]>();
    for (const event of events) {
      const key = (groupBy ? (event as unknown as Record<string, unknown>)[groupBy] as string : event.group) ?? 'Other';
      const list = groups.get(key) ?? [];
      list.push(event);
      groups.set(key, list);
    }
    return groups;
  }, [events, groupBy, layout]);

  const colors = (theme as { colors?: Record<string, string> })?.colors;
  const primaryColor = colors?.primary ?? '#0ea5e9';
  const textColor = colors?.text ?? '#0f172a';
  const mutedColor = colors?.muted ?? '#64748b';
  const borderColor = colors?.border ?? '#e2e8f0';

  const isAlternating = layout === 'alternating';

  const renderEvent = (event: TimelineComponentEvent, index: number) => {
    const isRight = isAlternating && index % 2 === 1;

    return (
      <div
        key={event.id ?? index}
        style={{
          display: 'flex',
          flexDirection: orientation === 'horizontal' ? 'column' : 'row',
          alignItems: orientation === 'horizontal' ? 'center' : 'flex-start',
          ...(isAlternating ? { flexDirection: isRight ? 'row-reverse' : 'row' } : {}),
          gap: '12px',
          position: 'relative',
        }}
      >
        {/* Marker */}
        <div style={{
          flexShrink: 0,
          width: '12px',
          height: '12px',
          borderRadius: '50%',
          background: event.color ?? primaryColor,
          marginTop: orientation === 'horizontal' ? 0 : '4px',
          position: 'relative',
          zIndex: 1,
        }} />

        {/* Content */}
        <div style={{
          flex: 1,
          paddingBottom: '20px',
          ...(isAlternating ? { textAlign: isRight ? 'right' : 'left' } : {}),
        }}>
          {showDates && event.date && (
            <div style={{ fontSize: '12px', color: mutedColor, marginBottom: '2px' }}>
              {event.date}
            </div>
          )}
          <div style={{ fontSize: '14px', fontWeight: 600, color: textColor }}>
            {event.title}
          </div>
          {showDescriptions && event.description && (
            <div style={{ fontSize: '13px', color: mutedColor, marginTop: '4px', lineHeight: 1.4 }}>
              {event.description}
            </div>
          )}
          {event.link && (
            <a
              href={event.link}
              target="_blank"
              rel="noopener noreferrer"
              style={{ fontSize: '12px', color: primaryColor, marginTop: '4px', display: 'inline-block' }}
            >
              Learn more
            </a>
          )}
        </div>
      </div>
    );
  };

  const renderTimeline = () => {
    if (orientation === 'horizontal') {
      return (
        <div style={{ display: 'flex', gap: '24px', overflowX: 'auto', padding: '16px', position: 'relative' }}>
          <div style={{
            position: 'absolute',
            top: '21px',
            left: '16px',
            right: '16px',
            height: '2px',
            background: borderColor,
          }} />
          {events.map((event, i) => renderEvent(event, i))}
        </div>
      );
    }

    // Vertical timeline
    return (
      <div style={{ position: 'relative', padding: '16px' }}>
        {/* Vertical line */}
        <div style={{
          position: 'absolute',
          left: isAlternating ? '50%' : '21px',
          top: '16px',
          bottom: '16px',
          width: '2px',
          background: borderColor,
          transform: isAlternating ? 'translateX(-50%)' : 'none',
        }} />
        {events.map((event, i) => renderEvent(event, i))}
      </div>
    );
  };

  const renderGrouped = () => {
    if (!groupedEvents) return renderTimeline();

    return (
      <div style={{ padding: '16px' }}>
        {Array.from(groupedEvents.entries()).map(([group, groupEvents]) => (
          <div key={group} style={{ marginBottom: '24px' }}>
            <h4 style={{ fontSize: '13px', fontWeight: 600, color: mutedColor, textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '12px' }}>
              {group}
            </h4>
            <div style={{ position: 'relative' }}>
              <div style={{
                position: 'absolute', left: '21px', top: 0, bottom: 0,
                width: '2px', background: borderColor,
              }} />
              {groupEvents.map((event, i) => renderEvent(event, i))}
            </div>
          </div>
        ))}
      </div>
    );
  };

  return (
    <RendererFrame title={title}>
      {layout === 'grouped' || groupBy ? renderGrouped() : renderTimeline()}
    </RendererFrame>
  );
};

export default TimelineRenderer;
export { TimelineRenderer };
