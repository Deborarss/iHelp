import React from 'react';

import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import GlobalStyle from './styles/global';

import { AuthProvider } from './hooks/auth';
import { ToastProvider } from './hooks/toast';

const App: React.FC = () => (
  <>
    <AuthProvider>
      <ToastProvider>
        <SignIn />
      </ToastProvider>
    </AuthProvider>
    <GlobalStyle />
  </>
);

export default App;
