import { useState } from 'react';
import { toast } from 'react-toastify';
import { Pencil, Trash2 } from 'lucide-react';
import {
  useDeleteTodoMutation,
  useUpdateTodoMutation,
} from '@/hooks/useTodoMutation';
import { FilterType, TodoType } from '@/types/TodoType';

interface TodoItemProps {
  todo: TodoType;
  filteredOption: FilterType;
}

/**
 * 투두 아이템 컴포넌트
 * @param todo - 개별 투두 아이템(id, title, completed 속성을 가짐)
 * @param filteredOption - 필터링 옵션(all, active, completed)
 * @returns {JSX.Element}
 */
const TodoItem = ({ todo, filteredOption }: TodoItemProps) => {
  const [editValue, setEditValue] = useState<string>(todo.title);
  const [isEditing, setIsEditing] = useState<boolean>(false);

  const { mutate: updateTodoMutate } = useUpdateTodoMutation();
  const { mutate: deleteTodoMutate } = useDeleteTodoMutation();

  const handleEditValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditValue(e.target.value);
  };

  const handleToggleTodo = () => {
    const updatedTodo = { ...todo, completed: !todo.completed };
    updateTodoMutate({ updatedTodo, filteredOption });
  };

  const handleUpdateTodo = () => {
    if (!isEditing) {
      setIsEditing(true);
      return;
    }

    // 입력값이 비어있는 경우를 방지
    if (editValue.trim().length === 0) {
      toast.error('1자 이상 입력해 주세요!');
      return;
    }

    const updatedTodo = { ...todo, title: editValue };
    updateTodoMutate({ updatedTodo, filteredOption });
    setIsEditing(false);
  };

  const handleDeleteTodo = () => {
    deleteTodoMutate({ deleteTodoId: todo.id, filteredOption });
  };

  return (
    <div className="flex items-center justify-between gap-5 rounded-md border px-4 py-3 shadow-sm sm:gap-3">
      <div className="flex min-w-0 flex-1 items-center gap-2 sm:gap-3">
        <input
          type="checkbox"
          checked={todo.completed}
          onChange={handleToggleTodo}
          aria-label="할 일 완료 여부"
          className="h-5 w-5 flex-shrink-0 cursor-pointer"
        />
        {isEditing ? (
          <input
            type="text"
            value={editValue}
            onChange={handleEditValueChange}
            className="h-8 min-w-0 flex-1 rounded border border-gray-300 px-3 py-1 text-sm"
          />
        ) : (
          <p className="h-full min-w-0 flex-1">{todo.title}</p>
        )}
      </div>

      <div className="flex flex-shrink-0 gap-2">
        <button
          onClick={handleUpdateTodo}
          aria-label="할 일 제목 수정하기"
          className="flex items-center gap-1 rounded-md bg-blue-600 px-3 py-1 text-sm text-white transition hover:bg-blue-700"
        >
          <Pencil size={16} />
          <span className="hidden sm:block">{isEditing ? '저장' : '수정'}</span>
        </button>

        <button
          onClick={handleDeleteTodo}
          aria-label="할 일 삭제하기"
          className="flex items-center gap-1 rounded-md bg-red-600 px-3 py-1 text-sm text-white transition hover:bg-red-700"
        >
          <Trash2 size={16} />
          <span className="hidden sm:block">삭제</span>
        </button>
      </div>
    </div>
  );
};

export default TodoItem;
