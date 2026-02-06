/**
 * LazyWrapper — Suspense + ErrorBoundary + loading skeleton
 */

import React, { Suspense } from 'react';
import { ErrorBoundary } from '../../core/ErrorBoundary';

interface LazyWrapperProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
  onError?: (error: Error) => void;
}

const DefaultSkeleton: React.FC = () => (
  <div style={{
    padding: '24px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    opacity: 0.4,
    fontSize: '14px',
    minHeight: '100px',
  }}>
    <div style={{
      width: '20px',
      height: '20px',
      border: '2px solid currentColor',
      borderTopColor: 'transparent',
      borderRadius: '50%',
      animation: 'spin 0.8s linear infinite',
      marginRight: '8px',
    }} />
    Loading...
    <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
  </div>
);

export const LazyWrapper: React.FC<LazyWrapperProps> = ({
  children,
  fallback,
  onError,
}) => {
  return (
    <ErrorBoundary onError={onError ? (err) => onError(err) : undefined}>
      <Suspense fallback={fallback ?? <DefaultSkeleton />}>
        {children}
      </Suspense>
    </ErrorBoundary>
  );
};

export default LazyWrapper;
