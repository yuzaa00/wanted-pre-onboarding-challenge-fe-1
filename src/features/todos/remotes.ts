import { Todo } from './type';
import { api } from '../../common/api';

export const getTodos = async (): Promise<Array<Todo>> => await api('GET', '/todos');

export const getTodoById = async (id: string): Promise<Todo> => await api('GET', `/todos/${id}`);

export const addTodo = async (newTodo: { title: string; content: string }) =>
  await api('POST', '/todos', newTodo);

export const editTodo = async (todo: { id: string; title: string; content: string }) =>
  await api('PUT', `/todos/${todo.id}`, todo);
