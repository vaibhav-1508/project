import { configureStore } from '@reduxjs/toolkit';
import tokensReducer from '@/features/tokens/store/tokensSlice';
import uiReducer from '@/features/tokens/store/uiSlice';

export const makeStore = () => {
  return configureStore({
    reducer: {
      tokens: tokensReducer,
      ui: uiReducer,
    },
    devTools: process.env.NODE_ENV !== 'production',
  });
};

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];
