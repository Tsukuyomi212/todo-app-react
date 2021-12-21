import { TODOS_API } from '../utils/apiRoutes';
import { camelCaseKeys } from '../utils/convertKeys';
import { api } from './baseApi';

export const getTodos = () => {
  return api.get(TODOS_API).then(result => {
    return camelCaseKeys(result).data;
  });
};

export const getTodo = () => {};

export const updateTodo = () => {};

export const deleteTodo = () => {};
