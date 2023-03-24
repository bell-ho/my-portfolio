import { useQuery } from '@tanstack/react-query';
import { queryKey } from '@/react-query/constants';
import { commentOptions } from '@/react-query/queryOptions';

export const usePortfoliosQuery = (userId) => {
  const { data = [], isLoading } = useQuery(
    [queryKey.portfolios, userId],
    () => getPortfolios(userId),
    {
      enabled: !!userId,
      ...commentOptions(5000, 300000),
      refetchOnMount: true,
      refetchOnWindowFocus: true,
      keepPreviousData: true,
    },
  );

  return { data, isLoading };
};
