import React from 'react';
import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthContextProvider';
import { LOGIN } from '../../utils/routes';
import { RegisterForm } from './RegisterForm';
import './register.css';

export const RegisterPage = () => {
  const { register } = useContext(AuthContext);

  const submitForm = async values => {
    await register(values);
  };

  return (
    <div>
      <RegisterForm handleSubmit={submitForm} />
      <div className="login-msg">
        <div>Already have an account?</div>
        <div>
          <Link to={LOGIN}>
            <span className="link-login">Login</span>
          </Link>
        </div>
      </div>
    </div>
  );
};
