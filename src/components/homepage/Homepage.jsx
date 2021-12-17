import React from 'react';
import { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthContextProvider';
import { LOGIN } from '../../utils/routes';
import { Sidebar } from '../sidebar/Sidebar';
import './homepage.css';

export const Homepage = () => {
  const navigate = useNavigate();
  const { authenticatedUser } = useContext(AuthContext);

  useEffect(() => {
    if (!authenticatedUser) {
      navigate(LOGIN);
    }
  });

  return (
    <>
      {authenticatedUser && (
        <div>
          <Sidebar />
          <div className="content">
            <h1>Welcome to Todo App!</h1>
          </div>
        </div>
      )}
    </>
  );
};
