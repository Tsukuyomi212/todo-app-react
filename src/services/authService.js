import { LOGIN_API, REGISTER_API, AUTHORIZED_USER_API } from '../utils/apiRoutes';
import { camelCaseKeys, snakeCaseKeys } from '../utils/convertKeys';
import { api } from './baseApi';

export const loginUser = payload => {
  return api
    .post(LOGIN_API, snakeCaseKeys(payload))
    .then(result => {
      return {
        user: result.data.user,
        token: result.data.access_token,
      };
    })
    .catch(error => {
      return {
        message: error.message,
      };
    });
};

export const me = () => {
  return api.get(AUTHORIZED_USER_API).then(result => {
    return camelCaseKeys({
      user: result.data.user,
    });
  });
};

export const registerUser = payload => {
  return api.post(REGISTER_API, snakeCaseKeys(payload)).then(result => {
    return camelCaseKeys({
      user: result.data.user,
      status: result.data.status,
    });
  });
};
