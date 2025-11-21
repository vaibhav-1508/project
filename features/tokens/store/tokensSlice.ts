import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Token, ColumnType, SortConfig } from '@/types/token';

interface TokensState {
  tokens: Record<string, Token>;
  lists: Record<ColumnType, string[]>;
  sortConfig: SortConfig;
}

const initialState: TokensState = {
  tokens: {},
  lists: { new_pairs: [], final_stretch: [], migrated: [] },
  sortConfig: { key: 'created', direction: 'desc' },
};

const tokensSlice = createSlice({
  name: 'tokens',
  initialState,
  reducers: {
    setTokens: (state, action: PayloadAction<Token[]>) => {
      const tokens: Record<string, Token> = {};
      const lists: Record<ColumnType, string[]> = { new_pairs: [], final_stretch: [], migrated: [] };

      action.payload.forEach((token) => {
        tokens[token.id] = token;
        lists[token.status].push(token.id);
      });

      state.tokens = tokens;
      state.lists = lists;
    },

    updateTokenPrice: (state, action: PayloadAction<{ id: string; price: number }>) => {
      const { id, price } = action.payload;
      if (state.tokens[id]) {
        state.tokens[id].price = price;
      }
    },

    addToken: (state, action: PayloadAction<Token>) => {
      const token = action.payload;
      state.tokens[token.id] = token;
      if (!state.lists[token.status].includes(token.id)) {
        state.lists[token.status].unshift(token.id);
      }
    },

    updateTokenStatus: (state, action: PayloadAction<{ id: string; newStatus: ColumnType }>) => {
      const { id, newStatus } = action.payload;
      const token = state.tokens[id];

      if (token) {
        const oldStatus = token.status;

        // Remove from old list
        state.lists[oldStatus] = state.lists[oldStatus].filter(tokenId => tokenId !== id);

        // Add to new list
        if (!state.lists[newStatus].includes(id)) {
          state.lists[newStatus].push(id);
        }

        // Update token status
        token.status = newStatus;
      }
    },

    setSortConfig: (state, action: PayloadAction<SortConfig>) => {
      state.sortConfig = action.payload;
    },
  },
});

export const { setTokens, updateTokenPrice, addToken, updateTokenStatus, setSortConfig } = tokensSlice.actions;
export default tokensSlice.reducer;

// Selectors
import { RootState } from '@/lib/store/store';
import { createSelector } from '@reduxjs/toolkit';

const selectTokens = (state: RootState) => state.tokens.tokens;
const selectLists = (state: RootState) => state.tokens.lists;
const selectSortConfig = (state: RootState) => state.tokens.sortConfig;

export const selectSortedTokenIds = createSelector(
  [selectTokens, selectLists, selectSortConfig],
  (tokens, lists, sortConfig) => {
    const sortedLists: Record<ColumnType, string[]> = {
      new_pairs: [],
      final_stretch: [],
      migrated: [],
    };

    (Object.keys(lists) as ColumnType[]).forEach((key) => {
      const list = lists[key];
      const sorted = [...list].sort((a, b) => {
        const tokenA = tokens[a];
        const tokenB = tokens[b];

        if (!tokenA || !tokenB) return 0;

        const valA = tokenA[sortConfig.key];
        const valB = tokenB[sortConfig.key];

        if (typeof valA === 'number' && typeof valB === 'number') {
          return sortConfig.direction === 'asc' ? valA - valB : valB - valA;
        }
        return 0;
      });
      sortedLists[key] = sorted;
    });

    return sortedLists;
  }
);
