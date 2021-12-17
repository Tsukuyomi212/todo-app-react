import React from 'react';
import { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthContextProvider';
import { Sidebar } from '../sidebar/Sidebar';
import './homepage.css';

export const Homepage = () => {
  const navigate = useNavigate();
  const { authenticatedUser } = useContext(AuthContext);

  return (
    <>
      <Sidebar />
      <div className="content">
        <h1>Welcome to Todo App!</h1>
      </div>
    </>
  );
};
