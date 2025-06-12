import { toast } from 'react-toastify';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteTodo, addTodo, updateTodo } from '@/apis/todoApi';
import { QUERY_KEYS } from '@/constants';

/**
 * 새로운 todo를 추가하는 useMutation 커스텀 훅
 */
export const useAddTodoMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: addTodo,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.TODOS],
      });
    },
    onError: () => {
      toast.error('투두 추가에 실패했습니다.');
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
        queryKey: [QUERY_KEYS.TODOS],
      });
    },
    onError: () => {
      toast.error('투두 삭제에 실패했습니다.');
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
        queryKey: [QUERY_KEYS.TODOS],
      });
    },
    onError: () => {
      toast.error('투두 업데이트에 실패했습니다.');
    },
  });
};
