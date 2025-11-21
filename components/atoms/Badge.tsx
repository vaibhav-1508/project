import React from 'react';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'default' | 'success' | 'warning' | 'error';
  className?: string;
}

export const Badge = React.memo<BadgeProps>(({
  children,
  variant = 'default',
  className = '',
}) => {
  const variantStyles = {
    default: 'bg-[#1a1b1e] border-white/5 text-gray-400',
    success: 'bg-emerald-900/30 border-emerald-500/20 text-emerald-500',
    warning: 'bg-yellow-900/30 border-yellow-500/20 text-yellow-500',
    error: 'bg-red-900/30 border-red-500/20 text-rose-500',
  };

  return (
    <span
      className={`text-[9px] px-1 rounded-sm border uppercase font-bold tracking-wider ${variantStyles[variant]} ${className}`}
    >
      {children}
    </span>
  );
});

Badge.displayName = 'Badge';
