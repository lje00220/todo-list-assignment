import { API_PATHS } from '@/constants';
import { TodoType } from '@/types/TodoType';
import axios from 'axios';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});

/**
 * GET 요청을 통해 todo 리스트를 가져오는 함수
 * @returns Promise<TodoType[]> - todo 리스트
 */
export const getTodos = async (): Promise<TodoType[]> => {
  const response = await api.get(API_PATHS.todos);
  return response.data;
};

/**
 * POST 요청을 통해 새로운 todo를 추가하는 함수
 * @param todo - id를 제외한 todo 객체
 */
export const postTodos = async (todo: Omit<TodoType, 'id'>) => {
  await api.post(API_PATHS.todos, todo);
};
