import { config } from './config';
import { ApiError } from './customError';

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
