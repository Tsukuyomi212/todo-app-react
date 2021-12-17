import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Homepage } from './components/homepage/Homepage';
import { HOMEPAGE, LOGIN, REGISTER } from './utils/routes';
import { LoginPage } from './components/login/LoginPage';
import { RegisterPage } from './components/register/RegisterPage';
import { AuthContextProvider } from './contexts/AuthContextProvider';

function App() {
  return (
    <div>
      <BrowserRouter>
        <AuthContextProvider>
          <Routes>
            <Route exact path={HOMEPAGE} element={<Homepage />} />
            <Route exact path={REGISTER} element={<RegisterPage />} />
            <Route exact path={LOGIN} element={<LoginPage />} />
          </Routes>
        </AuthContextProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
