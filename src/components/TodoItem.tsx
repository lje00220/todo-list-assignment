import { useDeleteTodoMutation } from '@/hooks/useTodoMutation';
import { TodoType } from '@/types/TodoType';
import { Trash2 } from 'lucide-react';

interface TodoItemProps {
  todo: TodoType;
}

/**
 * 투두 아이템 컴포넌트
 * @param todo - 개별 투두 아이템(id, title, completed 속성을 가짐)
 * @returns {JSX.Element}
 */
const TodoItem = ({ todo }: TodoItemProps) => {
  const { mutate: deleteTodoMutate } = useDeleteTodoMutation();

  const handleDeleteTodo = () => {
    deleteTodoMutate(todo.id);
  };

  return (
    <div key={todo.id} className="flex items-center gap-3 px-4 py-2">
      <input type="checkbox" />
      <p>{todo.title}</p>
      <button
        onClick={handleDeleteTodo}
        className="flex gap-1 rounded-md bg-red-400 px-2 py-1"
      >
        <Trash2 color="white" />
        <span className="text-white">삭제</span>
      </button>
    </div>
  );
};

export default TodoItem;
