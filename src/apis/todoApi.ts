import { API_PATHS } from '@/constants';
import { TodoType } from '@/types/TodoType';
import axios from 'axios';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});

/**
 * GET 요청을 통해 todo 리스트를 가져오는 함수
 * @param filteredOption - 필터링 옵션 (all, active, completed)
 * @returns Promise<TodoType[]> - todo 리스트
 */
export const getTodos = async (filteredOption: string): Promise<TodoType[]> => {
  let url = API_PATHS.todos;

  if (filteredOption === 'active') {
    url += '?completed=false';
  } else if (filteredOption === 'completed') {
    url += '?completed=true';
  }

  const response = await api.get(url);
  return response.data;
};

/**
 * POST 요청을 통해 새로운 todo를 추가하는 함수
 * @param todo - id를 제외한 todo 객체
 */
export const addTodo = async (todo: Omit<TodoType, 'id'>) => {
  await api.post(API_PATHS.todos, todo);
};

/**
 * DELETE 요청을 통해 특정 todo를 삭제하는 함수
 * @param id - 삭제할 todo 아이디
 */
export const deleteTodo = async (id: string) => {
  await api.delete(`${API_PATHS.todos}/${id}`);
};

/**
 * PATCH 요청을 통해 특정 todo를 업데이트하는 함수
 * @param todo - 업데이트할 todo 객체
 */
export const updateTodo = async (editTodo: TodoType) => {
  await api.patch(`${API_PATHS.todos}/${editTodo.id}`, editTodo);
};
