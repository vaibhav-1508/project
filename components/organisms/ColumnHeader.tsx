'use client';

import React from 'react';
import { Zap, Settings } from 'lucide-react';

interface ColumnHeaderProps {
  title: string;
  count: number;
}

export const ColumnHeader = React.memo<ColumnHeaderProps>(({ title, count }) => {
  return (
    <div className="flex items-center justify-between px-5 py-4 bg-[#0a0a0a] border-b border-white/5 sticky top-0 z-10">
      <div className="flex flex-col gap-1.5">
        <h2 className="text-base font-bold text-gray-100">{title}</h2>
        <div className="flex items-center gap-2 text-xs text-gray-500">
          <Zap size={12} className="text-emerald-500 fill-emerald-500" />
          <span className="font-mono text-emerald-500 font-semibold">4</span>
          <span className="font-mono ml-1">{count}</span>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <div className="flex bg-[#151618] rounded-md p-1 gap-1 border border-white/5">
          {['P1', 'P2', 'P3'].map((p, i) => (
            <button
              key={p}
              className={`px-3 py-1.5 text-xs font-semibold rounded transition-colors ${
                i === 0 ? 'bg-blue-600/20 text-blue-400' : 'text-gray-500 hover:text-gray-300 hover:bg-white/5'
              }`}
            >
              {p}
            </button>
          ))}
        </div>
        <Settings
          size={16}
          className="text-gray-500 cursor-pointer hover:text-gray-300 transition-colors"
        />
      </div>
    </div>
  );
});

ColumnHeader.displayName = 'ColumnHeader';
