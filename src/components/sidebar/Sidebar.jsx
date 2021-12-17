import React from 'react';
import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthContextProvider';
import { LOGIN, REGISTER, HOMEPAGE } from '../../utils/routes';
import './sidebar.css';

export const Sidebar = () => {
  const { authenticatedUser, logout } = useContext(AuthContext);

  return (
    <div className="sidebar">
      <Link to={HOMEPAGE}>Home</Link>
      {authenticatedUser ? (
        <div>
          <Link to="#" onClick={logout}>
            LOGOUT
          </Link>
        </div>
      ) : (
        <div>
          <Link to={LOGIN}>Login</Link>
          <Link to={REGISTER}>Register</Link>
        </div>
      )}
    </div>
  );
};
