import { useQuery } from '@tanstack/react-query';
import { queryKey } from '@/react-query/constants';
import { getProjects } from '@/pages/api/project';
import { commentOptions } from '@/react-query/queryOptions';

export const useProjectsByPortfolioQuery = (portfolioId) => {
  const { data = [], isLoading } = useQuery(
    [queryKey.projectsByPortfolio, portfolioId],
    () => getProjects(portfolioId),
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
