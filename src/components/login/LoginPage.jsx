import React from 'react';
import { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthContextProvider';
import { REGISTER, HOMEPAGE } from '../../utils/routes';
import { LoginForm } from './LoginForm';

export const LoginPage = () => {
  const { authenticatedUser, login } = useContext(AuthContext);
  const navigate = useNavigate();

  const submitForm = async values => {
    await login(values);
  };

  useEffect(() => {
    if (authenticatedUser) {
      navigate(HOMEPAGE);
    }
  }, [authenticatedUser, navigate]);

  return (
    <div>
      <LoginForm handleSubmit={submitForm} />
      <div className="register-msg">
        <div>{"Don't have an account?"}</div>
        <div>
          <Link to={REGISTER}>
            <span className="link-register ">Create one</span>
          </Link>
        </div>
      </div>
    </div>
  );
};
