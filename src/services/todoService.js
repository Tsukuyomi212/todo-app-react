import { TODOS_API } from '../utils/apiRoutes';
import { camelCaseKeys } from '../utils/convertKeys';
import { api } from './baseApi';

export const getTodos = () => {
  return api.get(TODOS_API).then(result => {
    return camelCaseKeys(result).data;
  });
};

export const getTodo = id => {
  return api.get(`${TODOS_API}/${id}`).then(result => camelCaseKeys(result));
};

export const createTodo = payload => {
  return api.post(TODOS_API, payload).then(result => camelCaseKeys(result));
};

export const updateTodo = (id, payload) => {
  return api.put(`${TODOS_API}/${id}`, payload).then(result => camelCaseKeys(result));
};

export const deleteTodo = id => {
  return api.delete(`${TODOS_API}/${id}`).then(() => console.log('deleted'));
};
