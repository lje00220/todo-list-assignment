import { QueryClient } from '@tanstack/react-query';
import { QUERY_KEYS } from '@/constants';

/**
 * todos 쿼리 무효화 유틸 함수
 * @param queryClient
 */
export const invalidateTodoQueries = (queryClient: QueryClient) => {
  queryClient.invalidateQueries({
    queryKey: [QUERY_KEYS.TODOS],
  });
};
