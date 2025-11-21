import React from 'react';
import { LucideIcon } from 'lucide-react';

interface StatBadgeProps {
  icon: LucideIcon;
  value?: string | number;
  color: string;
  text?: string;
}

export const StatBadge = React.memo<StatBadgeProps>(({
  icon: Icon,
  value,
  color,
  text,
}) => {
  return (
    <div
      className={`flex items-center gap-1 text-[10px] font-mono px-1 py-0.5 rounded bg-[#1a1b1e] border border-white/5 ${color}`}
    >
      <Icon size={10} strokeWidth={2.5} />
      {text && <span>{text}</span>}
      {value !== undefined && <span>{value}%</span>}
    </div>
  );
});

StatBadge.displayName = 'StatBadge';
