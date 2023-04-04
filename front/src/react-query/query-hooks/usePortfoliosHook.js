import { useQuery } from '@tanstack/react-query';
import { queryKey } from '@/react-query/constants';
import { commentOptions } from '@/react-query/queryOptions';
import { getPortfolioDetail, getPortfolioInfo, getPortfoliosByUser } from '@/pages/api/portfolio';

export const usePortfoliosQuery = (userId) => {
  const { data = [], isLoading } = useQuery(
    [queryKey.portfoliosByUser, userId],
    () => getPortfoliosByUser(userId),
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

export const usePortfoliosDetailQuery = (portfolioId) => {
  const { data = [], isLoading } = useQuery(
    [queryKey.portfolios, portfolioId],
    () => getPortfolioDetail(portfolioId),
    {
      enabled: !!portfolioId,
      ...commentOptions(5000, 300000),
      refetchOnMount: true,
      refetchOnWindowFocus: true,
      keepPreviousData: true,
    },
  );

  return { data, isLoading };
};

export const usePortfolioInfoQuery = (portfolioId) => {
  const { data = [], isLoading } = useQuery(
    [queryKey.portfolioInfo, portfolioId],
    () => getPortfolioInfo(portfolioId),
    {
      enabled: !!portfolioId,
      ...commentOptions(5000, 300000),
      refetchOnMount: true,
      refetchOnWindowFocus: true,
      keepPreviousData: true,
    },
  );

  return { data, isLoading };
};
