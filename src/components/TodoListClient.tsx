'use client';

import { useTodoQuery } from '@/hooks/useTodoQuery';
import { useState } from 'react';
import TodoInputForm from './TodoInputForm';
import Dropdown from './Dropdown';
import TodoItem from './TodoItem';
import Loading from './Loading';
import Error from './Error';
import { FilterType } from '@/types/TodoType';
import { FILTERS } from '@/constants';

/**
 * 투두리스트 클라이언트 컴포넌트
 * - 투두 입력, 수정, 삭제와 같은 클라이언트 사이드 로직 처리
 * @returns {JSX.Element}
 */
const TodoListClient = () => {
  const [filteredOption, setFilteredOption] = useState<FilterType>(FILTERS.ALL);

  const { data: todos, isLoading, isError } = useTodoQuery(filteredOption);

  if (isError) return <Error />;

  // 완료한 일을 뒤로 정렬하는 로직
  todos?.sort((a, b) => {
    if (a.completed === b.completed) {
      return a.id.localeCompare(b.id);
    } else {
      return a.completed ? 1 : -1;
    }
  });

  return (
    <main className="flex h-screen items-center justify-center bg-gray-100">
      <div className="flex h-[80vh] w-full flex-col rounded-lg bg-white py-10 shadow-xl sm:h-[70vh] sm:w-2/3 md:w-3/5 lg:w-1/2">
        {/* 상단 바 영역 */}
        <header className="px-6 py-8">
          <h1 className="mb-6 text-center text-3xl font-bold">투두리스트</h1>
          <TodoInputForm />
        </header>

        <hr className="border-b border-gray-200" />

        {/* 리스트 영역 */}
        <section className="flex h-full flex-col gap-3 overflow-y-auto px-4 py-6 sm:px-8">
          <div className="flex justify-end">
            <Dropdown setFilteredOption={setFilteredOption} />
          </div>

          {isLoading ? (
            <Loading />
          ) : (
            todos?.map((todo) => <TodoItem key={todo.id} todo={todo} />)
          )}
        </section>
      </div>
    </main>
  );
};

export default TodoListClient;
