export type ColumnType = 'new_pairs' | 'final_stretch' | 'migrated';

export interface TokenBadges {
  dev: number;
  audit: number;
  top10: number;
  sniper: number;
}

export interface TokenSocials {
  hasWebsite: boolean;
  hasTwitter: boolean;
  hasTelegram: boolean;
}

export interface Token {
  id: string;
  symbol: string;
  name: string;
  price: number;
  mcap: number;
  volume: number;
  change24h: number;
  created: number;
  imageColor: string;
  status: ColumnType;
  address: string;
  isPaid: boolean;
  badges: TokenBadges;
  socials: TokenSocials;
  holders?: number;
  transactions?: number;
}

export interface SortConfig {
  key: keyof Token;
  direction: 'asc' | 'desc';
}

export interface PriceUpdate {
  id: string;
  price: number;
  timestamp: number;
}

export interface WebSocketMessage {
  type: 'price_update' | 'new_token' | 'status_change';
  payload: PriceUpdate | Token;
}
