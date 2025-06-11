import { useQuery } from '@tanstack/react-query';
import { getTodos } from '@/apis/todoApi';
import { QUERY_KEY } from '@/constants';
import { FilterType } from '@/types/TodoType';

/**
 * 필터 옵션에 따라 todo 리스트를 가져오는 useQuery 커스텀 훅
 */
export const useTodoQuery = (filteredOption: FilterType) => {
  return useQuery({
    queryKey: [QUERY_KEY.todos, filteredOption],
    queryFn: () => getTodos(filteredOption),
  });
};
