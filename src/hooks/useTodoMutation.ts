import { postTodos } from '@/apis/todoApi';
import { useMutation, useQueryClient } from '@tanstack/react-query';

/**
 * 새로운 todo를 추가하는 useMutation 커스텀 훅
 */
export const useAddTodoMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: postTodos,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['todos'],
      });
    },
  });
};
