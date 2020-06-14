import React from 'react';
import { BrowserRouter } from 'react-router-dom';

import GlobalStyle from './styles/global';

import Routes from './routes';

import { AuthProvider } from './hooks/auth';
import { ToastProvider } from './hooks/toast';

const App: React.FC = () => (
  <BrowserRouter>
    <AuthProvider>
      <ToastProvider>
        <Routes />
      </ToastProvider>
    </AuthProvider>
    <GlobalStyle />
  </BrowserRouter>
);

export default App;
