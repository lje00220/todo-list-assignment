import { toast } from 'react-toastify';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteTodo, addTodo, updateTodo } from '@/apis/todoApi';
import { FILTERS, QUERY_KEYS } from '@/constants';
import { FilterType, TodoType } from '@/types/TodoType';
import { invalidateTodoQueries } from '@/utils/invalidateTodoQueries';
import { getTodoQueryKey } from '@/utils/getTodoQueryKey';

const FILTER_OPTIONS: FilterType[] = [
  FILTERS.ALL,
  FILTERS.ACTIVE,
  FILTERS.COMPLETED,
];

/**
 * 새로운 todo를 추가하는 useMutation 커스텀 훅
 */
export const useAddTodoMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: addTodo,
    onMutate: async (newTodo) => {
      await queryClient.cancelQueries({ queryKey: [QUERY_KEYS.TODOS] });

      const tempTodo = {
        ...newTodo,
        id: Date.now().toString(), // 임시 ID
      };

      // 각 필터 옵션에 대한 쿼리 데이터 업데이트
      FILTER_OPTIONS.forEach((option) => {
        const queryKey = getTodoQueryKey(option);
        queryClient.setQueryData<TodoType[]>(queryKey, (old) => {
          // 캐시된 데이터가 없으면 새로 생성
          if (!old) return [tempTodo];
          // 필터 옵션이 COMPLETED인 경우 추가하지 않음(새 투두는 ACTIVE 상태로 추가됨)
          if (option === FILTERS.COMPLETED) return old;
          return [...old, tempTodo];
        });
      });

      return {};
    },
    onError: () => {
      toast.error('투두 추가에 실패했습니다.');
    },
    onSettled: () => {
      invalidateTodoQueries(queryClient);
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

      // 각 필터 옵션에 대한 쿼리 데이터 업데이트
      FILTER_OPTIONS.forEach((option) => {
        const key = getTodoQueryKey(option);
        queryClient.setQueryData<TodoType[]>(key, (old) =>
          // 모든 쿼리키에서 해당 todo 삭제
          old?.filter((todo) => todo.id !== deleteTodoId),
        );
      });

      return {};
    },
    onError: () => {
      toast.error('투두 삭제에 실패했습니다.');
    },
    onSettled: () => {
      invalidateTodoQueries(queryClient);
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
    onMutate: async (updatedTodo) => {
      await queryClient.cancelQueries({ queryKey: [QUERY_KEYS.TODOS] });

      // 각 필터 옵션에 대한 쿼리 데이터 업데이트
      FILTER_OPTIONS.forEach((option) => {
        const key = getTodoQueryKey(option);
        queryClient.setQueryData<TodoType[]>(key, (old) => {
          // 캐시된 데이터가 없으면 얼리 리턴
          if (!old) return old;

          // 업데이트된 todo를 제외한 기존 todo 리스트
          let updatedTodoList = old.filter(
            (todo) => todo.id !== updatedTodo.id,
          );

          // 업데이트된 todo를 추가해야 하는지 확인
          const isSatisfied =
            option === FILTERS.ALL || // ALL 옵션은 항상 추가
            (option === FILTERS.ACTIVE && !updatedTodo.completed) || // ACTIVE 옵션은 완료되지 않았을 경우만 추가
            (option === FILTERS.COMPLETED && updatedTodo.completed); // COMPLETED 옵션은 완료된 경우만 추가

          if (isSatisfied) {
            updatedTodoList = [...updatedTodoList, updatedTodo];
          }

          return updatedTodoList;
        });
      });

      return {};
    },
    onError: () => {
      toast.error('투두 업데이트에 실패했습니다.');
    },
    onSettled: () => {
      invalidateTodoQueries(queryClient);
    },
  });
};
