import { useEffect, useState } from 'react';
import { useLocation } from 'wouter';
import { apiAuth } from '../../common/api';
import { ApiError } from '../../common/customError';
import getToken from '../../common/getToken';

function useAuth() {
  const [isAuth, setAuth] = useState(!!getToken());
  const [location, setLocation] = useLocation();

  async function login(email: string, password: string) {
    try {
      const response = await apiAuth('/users/login', { email, password });

      if (response) {
        localStorage.setItem('token', response.token);
        setAuth(true);
        return response.message;
      }
    } catch (err) {
      if (err instanceof ApiError) {
        alert(err.message);
      }
      // todo 에러바운더리로 잡아줘야함
      throw err;
    }
  }

  async function signup(email: string, password: string) {
    try {
      const response = await apiAuth('/users/create', { email, password });

      if (response) {
        return response.message;
      }
    } catch (err) {
      if (err instanceof ApiError) {
        alert(err.message);
      }
      throw err;
    }
  }

  function logout() {
    localStorage.removeItem('token');
    setAuth(false);
  }

  useEffect(() => {
    if (isAuth) {
      (location === '/login' || location === '/signup') && setLocation('/');
    } else {
      location !== '/signup' && setLocation('/login');
    }
  }, [isAuth, location, setLocation]);

  return {
    login,
    logout,
    signup,
    isAuth,
  };
}

export default useAuth;
