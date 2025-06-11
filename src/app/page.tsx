'use client';

import { useState } from 'react';
import Dropdown from '@/components/Dropdown';
import TodoInputForm from '@/components/TodoInputForm';
import TodoItem from '@/components/TodoItem';
import { useTodoQuery } from '@/hooks/useTodoQuery';
import { FILTERS } from '@/constants';
import { FilterType } from '@/types/TodoType';

const TodoListPage = () => {
  const [filteredOption, setFilteredOption] = useState<FilterType>(FILTERS.ALL);

  const { data: todos, isLoading, isError } = useTodoQuery(filteredOption);

  if (isLoading) return <div>로딩중...</div>;
  if (isError) return <div>데이터를 불러오는 데 문제가 발생했습니다.</div>;

  // 완료한 일을 뒤로 정렬하는 로직
  todos?.sort((a, b) => {
    if (a.completed === b.completed) {
      return a.id.localeCompare(b.id);
    } else {
      return a.completed ? 1 : -1;
    }
  });

  return (
    <div className="flex max-h-fit min-h-screen items-center justify-center bg-gray-100">
      <div className="flex h-5/6 w-full flex-col rounded-lg bg-white py-10 shadow-xl sm:w-2/3 md:w-3/5 lg:w-1/2">
        {/* 상단 바 영역 */}
        <div className="px-6 py-8">
          <h1 className="mb-6 text-center text-3xl font-bold">투두리스트</h1>
          <TodoInputForm />
        </div>

        <hr className="border-b border-gray-200" />

        {/* 리스트 영역 */}
        <div className="flex flex-col gap-3 px-4 py-6 sm:px-8">
          <div className="flex justify-end">
            <Dropdown setFilteredOption={setFilteredOption} />
          </div>
          {todos?.map((todo) => <TodoItem key={todo.id} todo={todo} />)}
        </div>
      </div>
    </div>
  );
};

export default TodoListPage;
