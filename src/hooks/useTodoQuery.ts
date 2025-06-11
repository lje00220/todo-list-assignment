import { getTodos } from '@/apis/todoApi';
import { QUERY_KEY } from '@/constants';
import { useQuery } from '@tanstack/react-query';

export const useTodoQuery = () => {
  return useQuery({
    queryKey: [QUERY_KEY.todos],
    queryFn: getTodos,
  });
};
