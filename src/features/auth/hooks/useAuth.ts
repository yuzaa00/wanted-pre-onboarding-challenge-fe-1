import { useEffect, useState } from 'react';
import { useLocation } from 'wouter';
import getToken from '../../common/getToken';
import postLogin from '../remotes/postLogin';
import postSignUp from '../remotes/postSignUp';

// todo try catch 개선 필요
function useAuth() {
  const [isAuth, setAuth] = useState(!!getToken());
  const [location, setLocation] = useLocation();

  async function login(email: string, password: string) {
    try {
      const response = await postLogin(email, password);

      if (response) {
        localStorage.setItem('token', response.token);
        setAuth(true);
        return response.message;
      }
    } catch (err) {
      return err;
    }
  }

  async function signup(email: string, password: string) {
    try {
      const response = await postSignUp(email, password);

      if (response) {
        return response.message;
      }
    } catch (err) {
      // throw Error(err);
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
