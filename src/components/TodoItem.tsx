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
  const [editValue, setEditValue] = useState<string>('');
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
    } else {
      const editTodo = { ...todo, title: editValue };
      updateTodoMutate(editTodo);
      setEditValue('');
      setIsEditing(false);
    }
  };

  const handleDeleteTodo = () => {
    deleteTodoMutate(todo.id);
  };

  return (
    <div key={todo.id} className="flex items-center gap-3 px-4 py-2">
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={handleToggleTodo}
      />
      {isEditing ? (
        <input
          value={editValue}
          onChange={handleEditValueChange}
          className="rounded border border-sky-500 px-2 py-1"
        />
      ) : (
        <p>{todo.title}</p>
      )}

      <div className="flex gap-3">
        <button
          onClick={handleUpdateTodo}
          className="flex gap-1 rounded-md bg-blue-500 px-2 py-1"
        >
          <Pencil color="white" />
          <span className="text-white">{isEditing ? '저장' : '수정'}</span>
        </button>

        <button
          onClick={handleDeleteTodo}
          className="flex gap-1 rounded-md bg-red-400 px-2 py-1"
        >
          <Trash2 color="white" />
          <span className="text-white">삭제</span>
        </button>
      </div>
    </div>
  );
};

export default TodoItem;
