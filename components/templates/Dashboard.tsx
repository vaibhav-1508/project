'use client';

import React, { useEffect } from 'react';
import { useAppSelector } from '@/lib/store/hooks';
import { useTokens } from '@/features/tokens/hooks/useTokens';
import { useWebSocket } from '@/features/websocket/useWebSocket';
import { ColumnType } from '@/types/token';
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

  const [activeTab, setActiveTab] = React.useState<ColumnType>('new_pairs');

  const tabs: { id: ColumnType; label: string }[] = [
    { id: 'new_pairs', label: 'New Pairs' },
    { id: 'final_stretch', label: 'Final Stretch' },
    { id: 'migrated', label: 'Migrated' },
  ];

  return (
    <div className="flex flex-col h-screen bg-[#050505] text-gray-300 font-sans selection:bg-indigo-500/30 p-4 md:p-6 lg:p-8">
      <div className="flex flex-col h-full rounded-2xl overflow-hidden border border-white/5 bg-gradient-to-b from-[#0a0a0a] to-[#050505]">
        <Header />
        <main className="flex-1 overflow-hidden p-4 md:p-6 lg:p-8">
          <div className="h-full max-w-[1920px] mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 overflow-hidden rounded-xl border border-white/10 shadow-2xl">
            <div className={`h-full ${activeTab === 'new_pairs' ? 'block' : 'hidden md:block'}`}>
              <Column title="New Pairs" type="new_pairs" />
            </div>
            <div className={`h-full ${activeTab === 'final_stretch' ? 'block' : 'hidden md:block'}`}>
              <Column title="Final Stretch" type="final_stretch" />
            </div>
            <div className={`h-full ${activeTab === 'migrated' ? 'block' : 'hidden md:block'}`}>
              <Column title="Migrated" type="migrated" />
            </div>
          </div>
        </main>
        <TokenModal token={activeToken} />

        {/* Mobile Tabs */}
        <div className="md:hidden h-14 bg-[#0a0a0a] border-t border-white/10 flex items-center justify-around px-4 text-sm font-bold text-gray-500 shrink-0">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-1 h-full flex items-center justify-center transition-colors ${activeTab === tab.id ? 'text-white bg-white/5' : 'hover:text-gray-300'
                }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
});

Dashboard.displayName = 'Dashboard';
