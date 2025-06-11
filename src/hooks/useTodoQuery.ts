import { getTodos } from '@/apis/todoApi';
import { QUERY_KEY } from '@/constants';
import { useQuery } from '@tanstack/react-query';

/**
 * 필터 옵션에 따라 todo 리스트를 가져오는 useQuery 커스텀 훅
 */
export const useTodoQuery = (filteredOption: string) => {
  return useQuery({
    queryKey: [QUERY_KEY.todos, filteredOption],
    queryFn: () => getTodos(filteredOption),
  });
};
