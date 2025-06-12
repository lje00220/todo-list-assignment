import { useQuery } from '@tanstack/react-query';
import { getTodos } from '@/apis/todoApi';
import { FilterType } from '@/types/TodoType';
import { getTodoQueryKey } from '@/utils/getTodoQueryKey';

/**
 * 필터 옵션에 따라 todo 리스트를 가져오는 useQuery 커스텀 훅
 */
export const useTodoQuery = (filteredOption: FilterType) => {
  return useQuery({
    queryKey: getTodoQueryKey(filteredOption),
    queryFn: () => getTodos(filteredOption),
    staleTime: 0,
    refetchOnMount: true,
  });
};
