import { useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';
import { fetchTokens } from '../api/tokenApi';
import { useAppDispatch } from '@/lib/store/hooks';
import { setTokens } from '../store/tokensSlice';
import { setLoading, setError } from '../store/uiSlice';

export const useTokens = (count: number = 40) => {
  const dispatch = useAppDispatch();

  const query = useQuery({
    queryKey: ['tokens', count],
    queryFn: () => fetchTokens(count),
  });

  useEffect(() => {
    if (query.isLoading) {
      dispatch(setLoading(true));
    }

    if (query.isSuccess && query.data) {
      dispatch(setTokens(query.data));
      dispatch(setLoading(false));
    }

    if (query.isError) {
      dispatch(setError('Failed to load tokens'));
      dispatch(setLoading(false));
    }
  }, [query.isLoading, query.isSuccess, query.isError, query.data, dispatch]);

  return query;
};
