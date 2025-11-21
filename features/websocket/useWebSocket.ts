import { useEffect, useRef } from 'react';
import { useAppDispatch, useAppSelector } from '@/lib/store/hooks';
import { updateTokenPrice } from '../tokens/store/tokensSlice';
import { generateRandomPriceUpdate } from '@/lib/utils/mockData';

export const useWebSocket = () => {
  const dispatch = useAppDispatch();
  const tokens = useAppSelector(state => state.tokens.tokens);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    // Mock WebSocket - simulate real-time price updates
    intervalRef.current = setInterval(() => {
      const tokenIds = Object.keys(tokens);
      if (tokenIds.length === 0) return;

      // Update 1-3 random tokens
      const updateCount = Math.floor(Math.random() * 3) + 1;

      for (let i = 0; i < updateCount; i++) {
        const randomId = tokenIds[Math.floor(Math.random() * tokenIds.length)];
        const currentPrice = tokens[randomId]?.price;

        if (currentPrice !== undefined) {
          const newPrice = generateRandomPriceUpdate(randomId, currentPrice);
          dispatch(updateTokenPrice({ id: randomId, price: newPrice }));
        }
      }
    }, 2000); // Update every 2 seconds

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [tokens, dispatch]);
};
