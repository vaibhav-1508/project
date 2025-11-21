'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Users, Search, Globe, Twitter, MessageCircle, Lock, ShieldCheck, Ghost } from 'lucide-react';
import { Token } from '@/types/token';
import { useAppDispatch } from '@/lib/store/hooks';
import { openModal } from '@/features/tokens/store/uiSlice';
import { formatCompact, formatTime } from '@/lib/utils/formatters';
import { TokenImage } from '../molecules/TokenImage';
import { StatBadge } from '../molecules/StatBadge';
import { Badge } from '../atoms/Badge';

interface TokenRowProps {
  token: Token;
}

export const TokenRow = React.memo<TokenRowProps>(({ token }) => {
  const dispatch = useAppDispatch();
  const [flash, setFlash] = useState<'up' | 'down' | null>(null);
  const prevPrice = useRef(token.price);

  useEffect(() => {
    if (token.price > prevPrice.current) {
      setFlash('up');
    } else if (token.price < prevPrice.current) {
      setFlash('down');
    }
    prevPrice.current = token.price;

    const timer = setTimeout(() => setFlash(null), 600);
    return () => clearTimeout(timer);
  }, [token.price]);

  const handleClick = () => {
    dispatch(openModal(token.id));
  };

  const isNew = token.created > Date.now() - 600000; // 10 minutes

  return (
    <div
      onClick={handleClick}
      className={`relative p-3 mb-2 rounded-md bg-[#0e0f11] hover:bg-[#141517] border-l-2 transition-all cursor-pointer group
        ${flash === 'up' ? 'border-l-emerald-500 bg-emerald-950/10' : flash === 'down' ? 'border-l-red-500 bg-red-950/10' : 'border-l-transparent border border-white/5'}
      `}
    >
      <div className="flex gap-3">
        {/* Left: Image & Address */}
        <div className="flex flex-col items-center gap-1">
          <TokenImage symbol={token.symbol} imageColor={token.imageColor} />
          <span className="text-[9px] font-mono text-gray-500 truncate max-w-[50px]">
            {token.address.slice(0, 4)}...{token.address.slice(-4)}
          </span>
        </div>

        {/* Right: Content */}
        <div className="flex-1 min-w-0 flex flex-col justify-between py-1">
          {/* Row 1: Name, Symbol, Socials */}
          <div className="flex justify-between items-start mb-3 gap-3">
            <div className="flex items-center gap-2 min-w-0 flex-1">
              <span className="font-bold text-gray-200 text-sm truncate leading-none">
                {token.symbol}
              </span>
              <span className="text-xs text-gray-500 truncate min-w-0 max-w-[140px]">
                {token.name}
              </span>
              <div className="flex gap-1.5 ml-2 opacity-60">
                {token.socials.hasWebsite && <Globe size={11} className="text-gray-400" />}
                {token.socials.hasTwitter && <Twitter size={11} className="text-gray-400" />}
                {token.socials.hasTelegram && <MessageCircle size={11} className="text-gray-400" />}
              </div>
            </div>
            <div className="text-right leading-tight shrink-0 pl-2">
              <div className="text-xs font-bold text-[#facc15] font-mono tracking-tight whitespace-nowrap px-2 py-1 bg-[#facc15]/10 rounded">
                MC {formatCompact(token.mcap)}
              </div>
            </div>
          </div>

          {/* Row 2: Time, Holders, Volume */}
          <div className="flex justify-between items-center my-2 gap-3">
            <div className="flex items-center gap-3">
              <span className={`text-xs font-bold font-mono ${isNew ? 'text-emerald-400' : 'text-gray-400'}`}>
                {formatTime(token.created)}
              </span>
              <div className="flex items-center gap-1.5 text-gray-500">
                <Users size={11} />
                <span className="text-[11px] font-mono">{formatCompact(token.holders || 0)}</span>
              </div>
              <div className="flex items-center gap-1.5 text-gray-500">
                <Search size={11} />
                <span className="text-[11px] font-mono">{token.transactions || 0}</span>
              </div>
            </div>
            <div className="text-xs text-gray-400 font-mono shrink-0 pl-2">
              V <span className="text-white font-bold">{formatCompact(token.volume)}</span>
            </div>
          </div>

          {/* Row 3: Badges */}
          <div className="flex items-center gap-2 mt-2 flex-wrap">
            <StatBadge icon={Users} value={token.badges.dev} color="text-rose-500" />
            <StatBadge icon={ShieldCheck} text="DS" color="text-blue-400" />
            <StatBadge icon={Ghost} value={token.badges.sniper} color="text-indigo-400" />
            <StatBadge icon={Lock} value={token.badges.top10} color="text-emerald-500" />
            {token.isPaid && <Badge variant="success">Paid</Badge>}
          </div>
        </div>
      </div>
    </div>
  );
});

TokenRow.displayName = 'TokenRow';
