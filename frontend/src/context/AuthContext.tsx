import React, { createContext, useCallback } from 'react';
import api from '../services/api';

interface SignInCredentials {
  email: string;
  password: string;
}

interface AuthContextData {
  name: string;
  signIn(credentials: SignInCredentials): Promise<void>;
}

export const AuthContext = createContext<AuthContextData>(
  {} as AuthContextData,
);

export const AuthProvider: React.FC = ({ children }) => {
  const signIn = useCallback(async ({ email, password }) => {
    const res = await api.post('sessions', {
      email,
      password,
    });
    console.log(res.data);
  }, []);

  return (
    <AuthContext.Provider value={{ name: 'Débora', signIn }}>
      {children}
    </AuthContext.Provider>
  );
};
