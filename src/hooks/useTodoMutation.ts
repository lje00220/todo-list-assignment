import { deleteTodo, addTodo, updateTodo } from '@/apis/todoApi';
import { QUERY_KEY } from '@/constants';
import { useMutation, useQueryClient } from '@tanstack/react-query';

/**
 * 새로운 todo를 추가하는 useMutation 커스텀 훅
 */
export const useAddTodoMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: addTodo,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEY.todos],
      });
    },
  });
};

/**
 * 특정 todo를 삭제하는 useMutation 커스텀 훅
 */
export const useDeleteTodoMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteTodo,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEY.todos],
      });
    },
  });
};

/**
 * 특정 todo를 업데이트하는 useMutation 커스텀 훅
 */
export const useUpdateTodoMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateTodo,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEY.todos],
      });
    },
  });
};
