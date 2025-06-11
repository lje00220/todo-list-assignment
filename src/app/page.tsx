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
    <div className="flex h-screen items-center justify-center bg-[#558bcf]">
      <div className="flex h-5/6 w-1/3 flex-col rounded-lg bg-white py-10">
        {/* 상단 바 영역 */}
        <div className="px-6 py-8">
          <h1 className="mb-6 text-center text-3xl font-bold text-sky-600">
            투두리스트
          </h1>
          <TodoInputForm />
        </div>

        <hr className="border-b border-gray-200" />

        {/* 리스트 영역 */}
        <div className="flex flex-col gap-3 px-6 py-6">
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
