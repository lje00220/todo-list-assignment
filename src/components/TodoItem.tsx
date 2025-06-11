import { TodoType } from '@/types/TodoType';

interface TodoItemProps {
  todo: TodoType;
}

/**
 * 투두 아이템 컴포넌트
 * @param todo - 개별 투두 아이템(id, title, completed 속성을 가짐)
 * @returns {JSX.Element}
 */
const TodoItem = ({ todo }: TodoItemProps) => {
  return (
    <div key={todo.id} className="flex gap-3 px-4 py-2">
      <input type="checkbox" />
      <p>{todo.title}</p>
    </div>
  );
};

export default TodoItem;
