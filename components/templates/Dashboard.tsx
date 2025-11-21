'use client';

import React, { useEffect } from 'react';
import { useAppSelector } from '@/lib/store/hooks';
import { useTokens } from '@/features/tokens/hooks/useTokens';
import { useWebSocket } from '@/features/websocket/useWebSocket';
import { Header } from '../organisms/Header';
import { Column } from '../organisms/Column';
import { TokenModal } from '../organisms/TokenModal';

export const Dashboard = React.memo(() => {
  const activeModalId = useAppSelector((state) => state.ui.activeModalId);
  const tokens = useAppSelector((state) => state.tokens.tokens);
  const activeToken = activeModalId ? tokens[activeModalId] : null;

  // Fetch initial data
  useTokens();

  // Enable WebSocket for real-time updates
  useWebSocket();

  return (
    <div className="flex flex-col h-screen bg-[#050505] text-gray-300 font-sans selection:bg-indigo-500/30 p-4 md:p-6 lg:p-8">
      <div className="flex flex-col h-full rounded-2xl overflow-hidden border border-white/5 bg-gradient-to-b from-[#0a0a0a] to-[#050505]">
        <Header />
        <main className="flex-1 overflow-hidden p-4 md:p-6 lg:p-8">
          <div className="h-full max-w-[1920px] mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 overflow-hidden rounded-xl border border-white/10 shadow-2xl">
            <Column title="New Pairs" type="new_pairs" />
            <Column title="Final Stretch" type="final_stretch" />
            <Column title="Migrated" type="migrated" />
          </div>
        </main>
        <TokenModal token={activeToken} />

        {/* Mobile Tabs Placeholder */}
        <div className="md:hidden h-14 bg-[#0a0a0a] border-t border-white/10 flex items-center justify-around px-4 text-sm font-bold text-gray-500 shrink-0">
          <span className="text-white">New Pairs</span>
          <span>Final Stretch</span>
          <span>Migrated</span>
        </div>
      </div>
    </div>
  );
});

Dashboard.displayName = 'Dashboard';
