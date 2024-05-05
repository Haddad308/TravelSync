import React from 'react'
import ReactDOM from 'react-dom/client'
import { NextUIProvider } from '@nextui-org/react'
import AuthProvider from './modules/auth/context/AuthProvider.jsx'
import App from './App.jsx'
import './index.css'
import './i18n';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <NextUIProvider>
      <AuthProvider>
        <App />
      </AuthProvider>
    </NextUIProvider>
  </React.StrictMode>,
);

// 

// TODO 
//* 1- Edit the color palette.
//* 2- Add security feature (Don't login with out right token).
//* 3- Continue sideBar information.


