import { getTodos } from '@/apis/todoApi';
import { useQuery } from '@tanstack/react-query';

export const useTodoQuery = () => {
  return useQuery({
    queryKey: ['todos'],
    queryFn: getTodos,
  });
};
