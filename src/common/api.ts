import { config } from './config';
import { ApiError, AuthError } from './customError';
import getToken from './getToken';

export const apiAuth = async (url = '', data = {}) => {
  return fetch(new URL(url, config.BASE_URL), {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
    .then((res) => (res.ok ? res : Promise.reject(res)))
    .then((res) => res.json())
    .catch(async (err) => {
      const jsonError = await err.json();

      throw new ApiError(jsonError.details, err.status, err.statusText);
    });
};

export const api = async (method: 'POST' | 'GET' | 'PUT' | 'DELETE', url = '', data?: any) => {
  const token = getToken();

  if (!token) throw new AuthError('토큰이 만료되었습니다');

  return fetch(new URL(url, config.BASE_URL), {
    method,
    headers: {
      'Content-Type': 'application/json',
      Authorization: token,
    },
    body: JSON.stringify(data),
  })
    .then((res) => (res.ok ? res : Promise.reject(res)))
    .then((res) => res.json())
    .then((res) => res.data)
    .catch(async (err) => {
      const jsonError = await err.json();

      throw new ApiError(jsonError.details, err.status, err.statusText);
    });
};
