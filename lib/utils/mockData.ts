import { Token, ColumnType } from '@/types/token';

const colors = [
  'bg-orange-500',
  'bg-blue-600',
  'bg-purple-600',
  'bg-green-500',
  'bg-red-500',
  'bg-pink-500',
  'bg-yellow-500',
  'bg-indigo-500',
  'bg-cyan-500',
  'bg-rose-500',
];

const tokenNames = [
  'Mancoin International Men\'s Day',
  'Project Alpha',
  'DegenSwap Protocol',
  'MoonToken Finance',
  'SafeRocket AI',
  'MetaVerse Coin',
  'CryptoKitty DAO',
  'Diamond Hands Token',
  'WAGMI Protocol',
  'Lambo Finance',
];

const statuses: ColumnType[] = ['new_pairs', 'final_stretch', 'migrated'];

export const generateMockTokens = (count: number): Token[] => {
  return Array.from({ length: count }).map((_, i) => ({
    id: `token-${i}`,
    symbol: `TKN${i}`,
    name: tokenNames[i % tokenNames.length] + (i > 9 ? ` v${Math.floor(i / 10)}` : ''),
    price: Math.random() * 100,
    mcap: Math.random() * 500000 + 50000,
    volume: Math.random() * 200000 + 10000,
    change24h: (Math.random() * 40) - 15,
    created: Date.now() - Math.floor(Math.random() * 3600000),
    imageColor: colors[i % colors.length],
    status: statuses[i % 3],
    address: `0x${Math.random().toString(36).substr(2, 8).toUpperCase()}`,
    isPaid: Math.random() > 0.7,
    badges: {
      dev: Math.floor(Math.random() * 50),
      audit: Math.floor(Math.random() * 100),
      top10: Math.floor(Math.random() * 40) + 10,
      sniper: Math.floor(Math.random() * 5),
    },
    socials: {
      hasWebsite: Math.random() > 0.3,
      hasTwitter: Math.random() > 0.3,
      hasTelegram: Math.random() > 0.3,
    },
    holders: Math.floor(Math.random() * 2000) + 100,
    transactions: Math.floor(Math.random() * 500) + 50,
  }));
};

export const generateRandomPriceUpdate = (tokenId: string, currentPrice: number) => {
  const change = (Math.random() - 0.5) * currentPrice * 0.1; // Max 10% change
  return Math.max(0.01, currentPrice + change);
};
