'use client';

import { useRef } from 'react';
import { Provider } from 'react-redux';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { makeStore, AppStore } from '@/lib/store/store';
import { makeQueryClient } from '@/lib/api/queryClient';

export function Providers({ children }: { children: React.ReactNode }) {
  const storeRef = useRef<AppStore | null>(null);
  const queryClientRef = useRef<QueryClient | null>(null);

  if (!storeRef.current) {
    storeRef.current = makeStore();
  }

  if (!queryClientRef.current) {
    queryClientRef.current = makeQueryClient();
  }

  return (
    <Provider store={storeRef.current}>
      <QueryClientProvider client={queryClientRef.current}>
        {children}
      </QueryClientProvider>
    </Provider>
  );
}
