import { useAddTodoMutation } from '@/hooks/useTodoMutation';
import { useState } from 'react';

const TodoInputForm = () => {
  const [inputValue, setInputValue] = useState<string>('');
  const { mutate: addTodoMutate } = useAddTodoMutation();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleAddTodo = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    addTodoMutate({ title: inputValue, completed: false });
    setInputValue('');
  };

  return (
    <form className="flex w-full gap-3 sm:px-8" onSubmit={handleAddTodo}>
      <input
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        placeholder="할 일을 입력해 주세요."
        className="flex-1 rounded border border-gray-300 px-3 transition focus:border-sky-400 sm:py-1 md:py-2"
      />
      <button className="rounded bg-blue-500 px-4 py-2 text-sm text-white transition hover:bg-blue-600">
        추가
      </button>
    </form>
  );
};

export default TodoInputForm;
