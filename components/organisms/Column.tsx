'use client';

import React from 'react';
import { ColumnType } from '@/types/token';
import { useAppSelector } from '@/lib/store/hooks';
import { ColumnHeader } from './ColumnHeader';
import { TokenRow } from './TokenRow';
import { Skeleton } from '../atoms/Skeleton';

interface ColumnProps {
  title: string;
  type: ColumnType;
}

const LoadingSkeleton = React.memo(() => (
  <div className="space-y-2 mt-2">
    {[1, 2, 3, 4].map((i) => (
      <Skeleton key={i} className="h-24 border border-white/5" />
    ))}
  </div>
));

LoadingSkeleton.displayName = 'LoadingSkeleton';

export const Column = React.memo<ColumnProps>(({ title, type }) => {
  const tokenIds = useAppSelector((state) => state.tokens.lists[type]);
  const tokens = useAppSelector((state) => state.tokens.tokens);
  const isLoading = useAppSelector((state) => state.ui.isLoading);

  return (
    <div className="flex flex-col h-full border-r border-white/5 last:border-r-0 bg-[#0a0a0a] rounded-lg md:rounded-none md:first:rounded-l-lg md:last:rounded-r-lg overflow-hidden">
      <ColumnHeader title={title} count={tokenIds.length} />
      <div className="flex-1 overflow-y-auto overflow-x-hidden px-3 py-2 custom-scrollbar bg-[#050505]">
        {isLoading ? (
          <LoadingSkeleton />
        ) : (
          tokenIds.map((id) => {
            const token = tokens[id];
            return token ? <TokenRow key={id} token={token} /> : null;
          })
        )}
      </div>
    </div>
  );
});

Column.displayName = 'Column';
