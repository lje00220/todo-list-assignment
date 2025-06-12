import { toast } from 'react-toastify';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteTodo, addTodo, updateTodo } from '@/apis/todoApi';
import { QUERY_KEYS } from '@/constants';
import { FilterType, TodoType } from '@/types/TodoType';
import { invalidateTodoQueries } from '@/utils/invalidateTodoQueries';

interface AddTodoParameters {
  newTodo: Omit<TodoType, 'id'>;
  filteredOption: FilterType;
}

interface DeleteTodoParameters {
  deleteTodoId: string;
  filteredOption: FilterType;
}

interface UpdateTodoParameters {
  updatedTodo: TodoType;
  filteredOption: FilterType;
}

/**
 * 새로운 todo를 추가하는 useMutation 커스텀 훅
 */
export const useAddTodoMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ newTodo }: AddTodoParameters) => addTodo(newTodo),
    onMutate: async ({ newTodo, filteredOption }) => {
      await queryClient.cancelQueries({
        queryKey: [QUERY_KEYS.TODOS, filteredOption],
      });

      const previousTodos = queryClient.getQueryData<TodoType[]>([
        QUERY_KEYS.TODOS,
        filteredOption,
      ]);

      const tempTodo = {
        ...newTodo,
        id: Date.now().toString(), // 임시 id
      };

      queryClient.setQueryData<TodoType[]>(
        [QUERY_KEYS.TODOS, filteredOption],
        (old) => [tempTodo, ...(old ?? [])],
      );

      return { previousTodos };
    },
    onError: (error, newTodo, context) => {
      queryClient.setQueryData([QUERY_KEYS.TODOS], context?.previousTodos);
      toast.error('투두 추가에 실패했습니다.');
    },
    onSettled: (data, error, variables) => {
      invalidateTodoQueries(queryClient, variables.filteredOption);
    },
  });
};

/**
 * 특정 todo를 삭제하는 useMutation 커스텀 훅
 */
export const useDeleteTodoMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ deleteTodoId }: DeleteTodoParameters) =>
      deleteTodo(deleteTodoId),
    onMutate: async ({ deleteTodoId, filteredOption }) => {
      await queryClient.cancelQueries({
        queryKey: [QUERY_KEYS.TODOS, filteredOption],
      });

      const previousTodos = queryClient.getQueryData<TodoType[]>([
        QUERY_KEYS.TODOS,
        filteredOption,
      ]);

      queryClient.setQueryData<TodoType[]>(
        [QUERY_KEYS.TODOS, filteredOption],
        (old) => old?.filter((todo) => todo.id !== deleteTodoId),
      );

      return { previousTodos };
    },
    onError: (error, deleteTodoId, context) => {
      queryClient.setQueryData([QUERY_KEYS.TODOS], context?.previousTodos);
      toast.error('투두 삭제에 실패했습니다.');
    },
    onSettled: (data, error, variables) => {
      invalidateTodoQueries(queryClient, variables.filteredOption);
    },
  });
};

/**
 * 특정 todo를 업데이트하는 useMutation 커스텀 훅
 */
export const useUpdateTodoMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ updatedTodo }: UpdateTodoParameters) =>
      updateTodo(updatedTodo),
    onMutate: async ({ updatedTodo, filteredOption }) => {
      await queryClient.cancelQueries({
        queryKey: [QUERY_KEYS.TODOS, filteredOption],
      });

      const previousTodos = queryClient.getQueryData<TodoType[]>([
        QUERY_KEYS.TODOS,
        filteredOption,
      ]);

      queryClient.setQueryData<TodoType[]>(
        [QUERY_KEYS.TODOS, filteredOption],
        (old) =>
          old?.map((todo) =>
            todo.id === updatedTodo.id ? { ...todo, ...updatedTodo } : todo,
          ),
      );

      return { previousTodos };
    },
    onError: (error, updatedTodo, context) => {
      queryClient.setQueryData([QUERY_KEYS.TODOS], context?.previousTodos);
      toast.error('투두 업데이트에 실패했습니다.');
    },
    onSettled: (data, error, variables) => {
      invalidateTodoQueries(queryClient, variables.filteredOption);
    },
  });
};
