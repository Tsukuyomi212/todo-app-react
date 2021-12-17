import { LOGIN_API, REGISTER_API, AUTHORIZED_USER } from '../utils/apiRoutes';
import { api } from './baseApi';

export const loginUser = payload => {
  return api
    .post(LOGIN_API, payload)
    .then(result => {
      return {
        user: result.data.user,
        token: result.data.token,
      };
    })
    .catch(error => {
      return {
        message: error.message,
      };
    });
};

export const me = () => {
  return api.get(AUTHORIZED_USER).then(result => {
    return {
      user: result.data.user,
    };
  });
};

export const registerUser = payload => {
  return api.post(REGISTER_API, payload).then(result => {
    return {
      user: result.data.user,
      token: result.data.token,
    };
  });
};
