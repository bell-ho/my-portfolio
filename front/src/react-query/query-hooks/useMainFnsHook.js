import { useQuery } from '@tanstack/react-query';
import { queryKey } from '@/react-query/constants';
import { getProjectMainFns } from '@/pages/api/project';
import { commentOptions } from '@/react-query/queryOptions';

export const useMainFnsByProjectQuery = (projectId) => {
  const { data = [], isLoading } = useQuery(
    [queryKey.mainFnByProject, projectId],
    () => getProjectMainFns(projectId),
    {
      enabled: !!projectId,
      ...commentOptions(5000, 300000),
      refetchOnMount: true,
      refetchOnWindowFocus: true,
      keepPreviousData: true,
    },
  );

  return { data, isLoading };
};
