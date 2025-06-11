import { TodoType } from '@/types/TodoType';
import axios from 'axios';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});

export const getTodos = async (): Promise<TodoType[]> => {
  const response = await api.get('/todos');
  return response.data;
};
