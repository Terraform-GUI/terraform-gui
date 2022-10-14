import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './components/App';
import reportWebVitals from './reportWebVitals';

import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/HomePage';
import Login from './pages/LoginPage';
import Register from './pages/RegisterPage';
import ForgotPassword from './pages/ForgotPasswordPage';
import ResetPassword from './pages/ResetPasswordPage';
import ConfirmUserMail from './pages/ConfirmUserMailPage';
import Profile from './pages/ProfilePage';

import UserContextProvider from './contexts/UserContextProvider';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

function isLogged() {
  //github connection
  const urlParams = new URLSearchParams(window.location.search);
  const accessToken = urlParams.get('token');
  const refreshToken = urlParams.get('refresh_token');
  if (accessToken != null && refreshToken != null) {
    localStorage.setItem('access_token', accessToken);
    localStorage.setItem('refresh_token', refreshToken);
  }

  return (
    !!localStorage.getItem('access_token') &&
    localStorage.getItem('access_token') != null
  );
}

root.render(
  <React.StrictMode>
    <UserContextProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />} />
          <Route
            path="/login"
            element={!isLogged() ? <Login /> : <Navigate replace to={'/'} />}
          />
          <Route
            path="/register"
            element={!isLogged() ? <Register /> : <Navigate replace to={'/'} />}
          />
          <Route
            path="/forgot-password"
            element={
              !isLogged() ? <ForgotPassword /> : <Navigate replace to={'/'} />
            }
          />
          <Route
            path="/password/reset"
            element={
              !isLogged() ? <ResetPassword /> : <Navigate replace to={'/'} />
            }
          />
          <Route
            path="/user/confirm"
            element={
              !isLogged() ? <ConfirmUserMail /> : <Navigate replace to={'/'} />
            }
          />
          <Route
            path="/profile"
            element={
              isLogged() ? <Profile /> : <Navigate replace to={'/home'} />
            }
          />
          <Route path="/home" element={<Home />} />
        </Routes>
      </BrowserRouter>
    </UserContextProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
