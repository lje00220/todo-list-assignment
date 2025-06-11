import { useState } from 'react';

const TodoInputForm = () => {
  const [inputValue, setInputValue] = useState<string>('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  return (
    <form className="flex w-full gap-3">
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
