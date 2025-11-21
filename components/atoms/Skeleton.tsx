import React from 'react';

interface SkeletonProps {
  className?: string;
  variant?: 'text' | 'circular' | 'rectangular';
}

export const Skeleton = React.memo<SkeletonProps>(({
  className = '',
  variant = 'rectangular',
}) => {
  const variantStyles = {
    text: 'h-4 w-full',
    circular: 'rounded-full',
    rectangular: 'rounded',
  };

  return (
    <div
      className={`bg-[#1a1b1e] animate-pulse ${variantStyles[variant]} ${className}`}
      aria-live="polite"
      aria-busy="true"
    />
  );
});

Skeleton.displayName = 'Skeleton';
