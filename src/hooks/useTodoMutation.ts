import { toast } from 'react-toastify';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteTodo, addTodo, updateTodo } from '@/apis/todoApi';
import { QUERY_KEYS } from '@/constants';
import { TodoType } from '@/types/TodoType';

/**
 * 새로운 todo를 추가하는 useMutation 커스텀 훅
 */
export const useAddTodoMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: addTodo,
    onMutate: async (newTodo) => {
      await queryClient.cancelQueries({ queryKey: [QUERY_KEYS.TODOS] });

      const previousTodos = queryClient.getQueryData<TodoType[]>([
        QUERY_KEYS.TODOS,
      ]);

      const tempTodo = {
        ...newTodo,
        id: crypto.randomUUID(), // 임시 id
      };

      queryClient.setQueryData<TodoType[]>([QUERY_KEYS.TODOS], (old) => [
        tempTodo,
        ...(old ?? []),
      ]);

      return { previousTodos };
    },
    onError: (error, newTodo, context) => {
      queryClient.setQueryData([QUERY_KEYS.TODOS], context?.previousTodos);
      toast.error('투두 추가에 실패했습니다.');
    },
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.TODOS],
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
    onMutate: async (deleteTodoId) => {
      await queryClient.cancelQueries({ queryKey: [QUERY_KEYS.TODOS] });

      const previousTodos = queryClient.getQueryData<TodoType[]>([
        QUERY_KEYS.TODOS,
      ]);

      queryClient.setQueryData<TodoType[]>([QUERY_KEYS.TODOS], (old) =>
        old?.filter((todo) => todo.id !== deleteTodoId),
      );

      return { previousTodos };
    },
    onError: (error, deleteTodoId, context) => {
      queryClient.setQueryData([QUERY_KEYS.TODOS], context?.previousTodos);
      toast.error('투두 삭제에 실패했습니다.');
    },
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.TODOS],
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
    onMutate: async (updateTodo) => {
      await queryClient.cancelQueries({ queryKey: [QUERY_KEYS.TODOS] });

      const previousTodos = queryClient.getQueryData<TodoType[]>([
        QUERY_KEYS.TODOS,
      ]);

      queryClient.setQueryData<TodoType[]>([QUERY_KEYS.TODOS], (old) =>
        old?.map((todo) =>
          todo.id === updateTodo.id ? { ...todo, ...updateTodo } : todo,
        ),
      );

      return { previousTodos };
    },
    onError: (error, updateTodo, context) => {
      queryClient.setQueryData([QUERY_KEYS.TODOS], context?.previousTodos);
      toast.error('투두 업데이트에 실패했습니다.');
    },
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.TODOS],
      });
    },
  });
};
