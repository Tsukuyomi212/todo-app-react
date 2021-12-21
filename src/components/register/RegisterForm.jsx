import React from 'react';
import * as Yup from 'yup';
import { Formik, Form, Field } from 'formik';
import './register.css';

export const RegisterForm = ({ handleSubmit }) => {
  const initialValues = {
    name: '',
    email: '',
    password: '',
    passwordConfirmation: '',
  };

  const RegisterSchema = Yup.object().shape({
    name: Yup.string().trim().required('You have to pick a name'),
    email: Yup.string().trim().email('Invalid email').required('Email field can not be empty'),
    password: Yup.string().trim().required('Password field can not be empty'),
    passwordConfirmation: Yup.string().oneOf(
      [Yup.ref('password'), null],
      'Passwords need to match',
    ),
  });

  return (
    <div className="register-form-container">
      <Formik
        initialValues={initialValues}
        onSubmit={handleSubmit}
        validationSchema={RegisterSchema}
      >
        {({ values, handleChange, errors, touched }) => (
          <Form>
            <div className="register-input-container">
              <label className="form-label">Name: </label>
              <Field
                label="name"
                name="name"
                value={values.name}
                onChange={handleChange}
                autoFocus
                className="register-field"
              />
              {errors.name && touched.name ? (
                <div className="input-error">{errors.name}</div>
              ) : null}
            </div>
            <div className="register-input-container">
              <label className="form-label">Email: </label>
              <Field
                label="email"
                name="email"
                value={values.email}
                onChange={handleChange}
                className="register-field"
              />
              {errors.email && touched.email ? (
                <div className="input-error">{errors.email}</div>
              ) : null}
            </div>
            <div className="register-input-container">
              <label className="form-label">Password: </label>
              <Field
                label="password"
                name="password"
                value={values.password}
                onChange={handleChange}
                className="register-field"
              />
              {errors.password && touched.password ? (
                <div className="input-error">{errors.password}</div>
              ) : null}
            </div>
            <div className="register-input-container">
              <label className="form-label">Confirm password: </label>
              <Field
                label="passwordConfirmation"
                name="passwordConfirmation"
                value={values.passwordConfirmation}
                onChange={handleChange}
                className="register-field"
              />
              {errors.passwordConfirmation && touched.passwordConfirmation ? (
                <div className="input-error">{errors.passwordConfirmation}</div>
              ) : null}
            </div>
            <div className="center-element">
              <button type="submit" className="register-submit-btn">
                Register
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};
