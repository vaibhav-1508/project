'use client';

import React, { useState, useEffect } from 'react';
import { X, ExternalLink, Sparkles } from 'lucide-react';
import { Token } from '@/types/token';
import { useAppDispatch } from '@/lib/store/hooks';
import { closeModal } from '@/features/tokens/store/uiSlice';
import { formatCompact } from '@/lib/utils/formatters';
import { TokenImage } from '../molecules/TokenImage';
import { Button } from '../atoms/Button';

interface TokenModalProps {
  token: Token | null;
}

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

export const TokenModal = React.memo<TokenModalProps>(({ token }) => {
  const dispatch = useAppDispatch();
  const [aiAnalysis, setAiAnalysis] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  useEffect(() => {
    setAiAnalysis(null);
    setIsAnalyzing(false);
  }, [token?.id]);

  if (!token) return null;

  const handleClose = () => {
    dispatch(closeModal());
  };

  const handleAnalyze = async () => {
    if (isAnalyzing) return;
    setIsAnalyzing(true);

    const prompt = `
      Analyze this crypto token based on this mock data:
      Name: ${token.name} (${token.symbol})
      Market Cap: ${formatCompact(token.mcap)}
      24h Change: ${token.change24h.toFixed(2)}%
      Volume: ${formatCompact(token.volume)}

      Give a short, humorous, "degen-style" trader analysis (max 2 sentences).
      Use crypto slang.
    `;

    const result = await callGemini(prompt, 'You are a cynical crypto bot.');
    setAiAnalysis(result);
    setIsAnalyzing(false);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200"
      onClick={handleClose}
    >
      <div
        className="bg-[#0e0f11] border border-white/10 rounded-xl w-full max-w-lg shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-6 border-b border-white/5 flex justify-between items-start bg-[#151618]">
          <div className="flex items-center gap-4">
            <div className={`w-12 h-12 rounded-md ${token.imageColor} flex items-center justify-center text-white font-bold text-lg shadow-lg`}>
              {token.symbol[0]}
            </div>
            <div>
              <h2 className="text-xl font-bold text-white leading-tight mb-1">{token.name}</h2>
              <span className="text-sm text-gray-400">{token.symbol} • {token.address}</span>
            </div>
          </div>
          <button onClick={handleClose} className="text-gray-400 hover:text-white transition-colors ml-4">
            <X size={20} />
          </button>
        </div>

        {/* Stats Grid */}
        <div className="p-6 grid grid-cols-2 gap-4">
          <div className="bg-black/40 p-5 rounded-lg border border-white/5">
            <div className="text-gray-400 text-xs uppercase mb-2 tracking-wider font-medium">Market Cap</div>
            <div className="text-2xl font-mono text-[#facc15] font-bold">{formatCompact(token.mcap)}</div>
          </div>
          <div className="bg-black/40 p-5 rounded-lg border border-white/5">
            <div className="text-gray-400 text-xs uppercase mb-2 tracking-wider font-medium">Volume</div>
            <div className="text-2xl font-mono text-white font-bold">{formatCompact(token.volume)}</div>
          </div>
        </div>

        {/* AI Sentiment Section */}
        <div className="px-6 pb-6">
          <div className="bg-indigo-950/10 border border-indigo-500/20 rounded-lg p-5">
            <div className="flex justify-between items-center mb-3">
              <div className="flex items-center gap-2 text-indigo-300 text-sm font-bold">
                <Sparkles size={14} /> AI Sentiment
              </div>
              {!aiAnalysis && !isAnalyzing && (
                <button
                  onClick={handleAnalyze}
                  className="text-xs bg-indigo-600 hover:bg-indigo-500 text-white px-4 py-1.5 rounded-md font-semibold transition-colors"
                >
                  Generate
                </button>
              )}
            </div>
            {isAnalyzing ? (
              <div className="h-4 w-2/3 bg-indigo-500/20 animate-pulse rounded" />
            ) : aiAnalysis ? (
              <div className="text-sm text-indigo-200 italic leading-relaxed mt-2">&quot;{aiAnalysis}&quot;</div>
            ) : (
              <div className="text-xs text-indigo-400/60 mt-2">Ready to analyze chart data...</div>
            )}
          </div>
        </div>

        {/* Actions */}
        <div className="px-6 pb-6 flex gap-3">
          <button className="flex-1 bg-indigo-600 hover:bg-indigo-500 text-white py-3 rounded-lg font-bold text-base flex items-center justify-center gap-2 transition-colors">
            Trade <ExternalLink size={16} />
          </button>
        </div>
      </div>
    </div>
  );
});

TokenModal.displayName = 'TokenModal';
