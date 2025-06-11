import TodoItem from '@/components/TodoItem';

const TodoListPage = () => {
  const MOCK_DATA = [
    {
      id: '1',
      title: '첫 번째 할 일',
      completed: false,
    },
    {
      id: '2',
      title: '두 번째 할 일',
      completed: false,
    },
    {
      id: '3',
      title: '세 번째 할 일',
      completed: false,
    },
  ];

  return (
    <div className="flex h-screen items-center justify-center bg-[#558bcf]">
      <div className="flex h-5/6 w-1/3 flex-col rounded-lg bg-white py-10">
        {/* 상단 바 영역 */}
        <div className="px-6 py-8">
          <h1 className="mb-6 text-center text-3xl font-bold text-sky-600">
            투두리스트
          </h1>
          <div className="flex w-full gap-3">
            <input
              type="text"
              className="flex-1 rounded border border-sky-500 px-4 py-2"
            />
            <button className="rounded bg-sky-500 px-4 py-2 text-white">
              추가하기
            </button>
          </div>
        </div>

        <hr className="border-b border-gray-200" />

        {/* 리스트 영역 */}
        <div className="flex flex-col gap-3 px-6 py-6">
          {MOCK_DATA.map((todo) => (
            <TodoItem key={todo.id} todo={todo} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default TodoListPage;
