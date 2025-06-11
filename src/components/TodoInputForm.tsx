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
    <form className="flex w-full gap-3" onSubmit={handleAddTodo}>
      <input
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        className="flex-1 rounded border border-sky-500 px-4 py-2"
      />
      <button className="rounded bg-sky-500 px-4 py-2 text-white">
        추가하기
      </button>
    </form>
  );
};

export default TodoInputForm;
