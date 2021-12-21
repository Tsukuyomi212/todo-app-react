import React from 'react';
import { createContext, useState, useEffect, useMemo, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { me } from '../services/authService';
import { HOMEPAGE, LOGIN } from '../utils/routes';
import { loginUser, registerUser } from '../services/authService.js';

export const AuthContext = createContext(undefined);

export const AuthContextProvider = ({ children }) => {
  const [authenticatedUser, setAuthenticatedUser] = useState(null);
  const [token, setToken] = useState(null);
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
        await authenticateUser({ user: result.user, token: result.token });
        navigate(HOMEPAGE);
      } catch (error) {
        console.log(error);
      }
    },
    [navigate],
  );

  const authenticateUser = ({ user, token }) => {
    localStorage.setItem('token', token);
    setToken(token);
    setAuthenticatedUser(user);
  };

  const fetchAuthenticatedUser = async () => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const user = await me();
        setAuthenticatedUser(user);
      } catch (error) {
        console.log(error);
      }
    }
  };

  const logout = useCallback(() => {
    localStorage.removeItem('token');
    setAuthenticatedUser(null);
    navigate(LOGIN);
  }, [navigate]);

  useEffect(() => {
    fetchAuthenticatedUser();
  }, [token]);

  const memoedAuthValue = useMemo(
    () => ({
      authenticatedUser,
      login,
      logout,
      register,
      fetchAuthenticatedUser,
    }),
    [authenticatedUser, login, logout, register],
  );

  return <AuthContext.Provider value={memoedAuthValue}>{children}</AuthContext.Provider>;
};
