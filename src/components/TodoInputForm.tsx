import { useState } from 'react';
import { toast } from 'react-toastify';
import { useAddTodoMutation } from '@/hooks/useTodoMutation';

/**
 * 투두 입력 폼 컴포넌트
 * - 새로운 투두를 추가할 수 있는 입력 폼
 * @returns {JSX.Element}
 */
const TodoInputForm = () => {
  const [inputValue, setInputValue] = useState<string>('');
  const { mutate: addTodoMutate } = useAddTodoMutation();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleAddTodo = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // 입력값이 비어있는 경우를 방지
    if (inputValue.trim().length === 0) {
      toast.error('할 일을 입력해 주세요!');
      return;
    }

    const newTodo = {
      title: inputValue,
      completed: false,
    };

    addTodoMutate(newTodo);
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
        autoFocus
      />
      <button className="rounded bg-blue-600 px-4 py-2 text-sm text-white transition hover:bg-blue-700">
        추가
      </button>
    </form>
  );
};

export default TodoInputForm;
