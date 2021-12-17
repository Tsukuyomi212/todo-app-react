import React from 'react';
import { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthContextProvider';

export const Homepage = () => {
  const navigate = useNavigate();
  const { authenticatedUser } = useContext(AuthContext);

  return (
    <div>
      <h1>Welcome to Todo App!</h1>
    </div>
  );
};
