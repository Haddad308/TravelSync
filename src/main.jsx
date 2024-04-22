import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { NextUIProvider } from '@nextui-org/react'
import AuthProvider from './modules/auth/context/AuthProvider.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <NextUIProvider>
      <AuthProvider>
        <App />
      </AuthProvider>
    </NextUIProvider>
  </React.StrictMode>,
);

// document.getElementsByTagName('html')[0].setAttribute("dir", "rtl");

// TODO 
//* 1- Edit the color palette.
//* 2- Prettier and Eslint config.
