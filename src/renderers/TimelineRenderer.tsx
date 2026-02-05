import React from 'react';
import type { TimelineContent, Theme } from '../types';

interface TimelineRendererProps {
  content: TimelineContent;
  theme: Theme;
}

export const TimelineRenderer: React.FC<TimelineRendererProps> = ({ content, theme }) => {
  const { events, options = {} } = content;
  const { orientation = 'horizontal', compact = false } = options;

  const isHorizontal = orientation === 'horizontal';

  return (
    <div className="timeline-renderer">
      <div className={`timeline ${isHorizontal ? 'timeline-horizontal' : 'timeline-vertical'}`}>
        {events.map((event, index) => (
          <div key={index} className="timeline-item">
            <div className="timeline-marker">
              <div className="marker-dot" />
            </div>
            <div className="timeline-content">
              <div className="timeline-date">
                {event.date}
              </div>
              <div className="timeline-title">
                {event.title}
              </div>
              {event.description && (
                <div className="timeline-description">
                  {event.description}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
