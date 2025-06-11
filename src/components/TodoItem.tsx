import { useState } from 'react';
import {
  useDeleteTodoMutation,
  useUpdateTodoMutation,
} from '@/hooks/useTodoMutation';
import { TodoType } from '@/types/TodoType';
import { Pencil, Trash2 } from 'lucide-react';

interface TodoItemProps {
  todo: TodoType;
}

/**
 * 투두 아이템 컴포넌트
 * @param todo - 개별 투두 아이템(id, title, completed 속성을 가짐)
 * @returns {JSX.Element}
 */
const TodoItem = ({ todo }: TodoItemProps) => {
  const [editValue, setEditValue] = useState<string>(todo.title);
  const [isEditing, setIsEditing] = useState<boolean>(false);

  const { mutate: updateTodoMutate } = useUpdateTodoMutation();
  const { mutate: deleteTodoMutate } = useDeleteTodoMutation();

  const handleEditValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditValue(e.target.value);
  };

  const handleToggleTodo = () => {
    const editTodo = { ...todo, completed: !todo.completed };
    updateTodoMutate(editTodo);
  };

  const handleUpdateTodo = () => {
    if (!isEditing) {
      setIsEditing(true);
      return;
    }

    // 입력값이 비어있는 경우를 방지
    if (editValue.length === 0) {
      alert('1자 이상 입력해주세요!');
      return;
    }

    const editTodo = { ...todo, title: editValue };
    updateTodoMutate(editTodo);
    setIsEditing(false);
  };

  const handleDeleteTodo = () => {
    deleteTodoMutate(todo.id);
  };

  return (
    <div className="flex items-center justify-between gap-3 rounded-md border px-4 py-3 shadow-sm">
      <div className="flex items-center gap-3">
        <input
          type="checkbox"
          checked={todo.completed}
          onChange={handleToggleTodo}
          className="h-5 w-5 cursor-pointer"
        />
        {isEditing ? (
          <input
            type="text"
            value={editValue}
            onChange={handleEditValueChange}
            className="h-full rounded border border-gray-300 p-1"
          />
        ) : (
          <p className="h-full">{todo.title}</p>
        )}
      </div>

      <div className="flex gap-2">
        <button
          onClick={handleUpdateTodo}
          className="flex items-center gap-1 rounded-md bg-blue-500 px-3 py-1 text-sm text-white transition hover:bg-blue-600"
        >
          <Pencil size={16} />
          <span>{isEditing ? '저장' : '수정'}</span>
        </button>

        <button
          onClick={handleDeleteTodo}
          className="flex items-center gap-1 rounded-md bg-red-400 px-3 py-1 text-sm text-white transition hover:bg-red-500"
        >
          <Trash2 size={16} />
          <span>삭제</span>
        </button>
      </div>
    </div>
  );
};

export default TodoItem;
