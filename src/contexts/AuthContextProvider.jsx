import React from 'react';
import { createContext, useState, useEffect, useMemo, useCallback } from 'react';
import { useNavigate } from 'react-router';
import { me } from '../services/authService';
import { HOMEPAGE, LOGIN } from '../utils/routes';
import { loginUser, registerUser } from '../services/authService.js';

export const AuthContext = createContext(undefined);

export const AuthContextProvider = ({ children }) => {
  const [authenticatedUser, setAuthenticatedUser] = useState(null);
  const navigate = useNavigate();

  const register = useCallback(
    async payload => {
      try {
        const result = await registerUser(payload);
        if (result.status === '201') {
          navigate(LOGIN);
        }
      } catch (error) {
        console.log(error);
      }
    },
    [navigate],
  );

  const login = useCallback(
    async payload => {
      try {
        const result = await loginUser(payload);
        if (result.token) {
          await authenticateUser({ user: result.user, token: result.token });
          navigate(HOMEPAGE);
        }
      } catch (error) {
        console.log(error);
      }
    },
    [navigate],
  );

  const authenticateUser = ({ user, token }) => {
    localStorage.setItem('token', token);
    setAuthenticatedUser(user);
  };

  const fetchAuthenticatedUser = useCallback(async () => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const user = await me();
        setAuthenticatedUser(user);
      } catch (error) {
        console.log(error);
      }
    } else {
      navigate(LOGIN);
    }
  }, [navigate]);

  const logout = useCallback(() => {
    localStorage.removeItem('token');
    setAuthenticatedUser(null);
    navigate(LOGIN);
  }, [navigate]);

  useEffect(() => {
    if (!authenticatedUser) {
      fetchAuthenticatedUser();
    }
  }, [fetchAuthenticatedUser, authenticatedUser]);

  const memoedAuthValue = useMemo(
    () => ({
      authenticatedUser,
      login,
      logout,
      register,
      fetchAuthenticatedUser,
    }),
    [authenticatedUser, fetchAuthenticatedUser, login, logout, register],
  );

  return <AuthContext.Provider value={memoedAuthValue}>{children}</AuthContext.Provider>;
};
