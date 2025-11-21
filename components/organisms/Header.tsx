'use client';

import React, { useState } from 'react';
import { LayoutGrid, Volume2, Settings, Monitor, BrainCircuit } from 'lucide-react';
import { SearchBar } from '../molecules/SearchBar';

// Gemini API Configuration
const GEMINI_API_KEY = process.env.NEXT_PUBLIC_GEMINI_API_KEY || '';
const GEMINI_MODEL = 'gemini-2.5-flash-preview-09-2025';

const callGemini = async (prompt: string, systemPrompt: string = 'You are a helpful assistant.'): Promise<string> => {
  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent?key=${GEMINI_API_KEY}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
          systemInstruction: { parts: [{ text: systemPrompt }] },
        }),
      }
    );

    if (!response.ok) throw new Error('Gemini API call failed');

    const data = await response.json();
    return data.candidates?.[0]?.content?.parts?.[0]?.text || 'Analysis failed.';
  } catch (error) {
    console.error('Gemini API Error:', error);
    return 'System unavailable.';
  }
};

const GlobalPulse = React.memo(() => {
  const [pulse, setPulse] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handlePulse = async () => {
    setLoading(true);
    const res = await callGemini(
      'Describe the crypto market vibe in 5 words based on current trends',
      'You are a cool bot.'
    );
    setPulse(res);
    setLoading(false);
  };

  return (
    <div className="flex items-center gap-2 mr-4">
      <button
        onClick={handlePulse}
        className="flex items-center gap-2 text-xs text-gray-400 hover:text-white bg-[#1a1b1e] px-3 py-1.5 rounded border border-white/5"
      >
        <BrainCircuit size={14} className="text-indigo-500" />
        {loading ? 'Scanning...' : pulse || 'Market Pulse'}
      </button>
    </div>
  );
});

GlobalPulse.displayName = 'GlobalPulse';

export const Header = React.memo(() => {
  return (
    <header className="h-16 bg-transparent border-b border-white/5 flex items-center px-6 md:px-8 lg:px-10 justify-between shrink-0">
      <div className="flex items-center gap-10">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-indigo-600 rounded-md flex items-center justify-center font-bold text-white text-base shadow-lg shadow-indigo-600/20">
            P
          </div>
          <span className="font-bold text-gray-100 text-2xl tracking-tight">Pulse</span>
        </div>
        <SearchBar className="w-80 hidden md:block" />
      </div>

      <div className="flex items-center gap-4">
        <GlobalPulse />
        <div className="flex items-center gap-5 text-gray-500">
          <LayoutGrid size={18} className="hover:text-gray-300 cursor-pointer transition-colors" />
          <Volume2 size={18} className="hover:text-gray-300 cursor-pointer transition-colors" />
          <Settings size={18} className="hover:text-gray-300 cursor-pointer transition-colors" />
          <div className="flex items-center gap-1.5 bg-[#1a1b1e] px-3 py-1.5 rounded-md text-xs border border-white/5">
            <Monitor size={14} className="text-emerald-500" />
            <span className="font-mono text-emerald-500 font-bold">1</span>
            <span className="font-mono text-gray-400">0</span>
          </div>
        </div>
      </div>
    </header>
  );
});

Header.displayName = 'Header';
