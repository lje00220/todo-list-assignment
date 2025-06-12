import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';
import TodoListClient from '@/components/TodoListClient';
import { getTodos } from '@/apis/todoApi';
import { getTodoQueryKey } from '@/utils/getTodoQueryKey';
import { FILTERS } from '@/constants';

const TodoListPage = async () => {
  const queryClient = new QueryClient();
  const defaultFilter = FILTERS.ALL;

  await queryClient.prefetchQuery({
    queryKey: getTodoQueryKey(defaultFilter),
    queryFn: () => getTodos(defaultFilter),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <TodoListClient />
    </HydrationBoundary>
  );
};

export default TodoListPage;
