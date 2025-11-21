import { Token } from '@/types/token';

export const fetchTokens = async (count: number = 40): Promise<Token[]> => {
  const response = await fetch(`/api/tokens?count=${count}`);

  if (!response.ok) {
    throw new Error('Failed to fetch tokens');
  }

  const data = await response.json();
  return data.data;
};
