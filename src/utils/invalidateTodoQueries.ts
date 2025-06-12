import { QUERY_KEYS } from '@/constants';
import { FilterType } from '@/types/TodoType';
import { QueryClient } from '@tanstack/react-query';

/**
 * todos 쿼리 무효화 유틸 함수
 * @param queryClient
 * @param filteredOption - 필터링 옵션(all, active, completed)
 */
export const invalidateTodoQueries = (
  queryClient: QueryClient,
  filteredOption: FilterType,
) => {
  queryClient.invalidateQueries({
    queryKey: [QUERY_KEYS.TODOS, filteredOption],
  });
};
