import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

import './index.css';
import App from './App';

import 'bootstrap/dist/css/bootstrap.css';
import 'react-toastify/dist/ReactToastify.css';

import { UserContextProvider } from './context/user.context';
import { ToastContextProvider } from './context/toast.context';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <ToastContextProvider>
      <UserContextProvider>
        <App />
      </UserContextProvider>
    </ToastContextProvider>
  </BrowserRouter>
);
