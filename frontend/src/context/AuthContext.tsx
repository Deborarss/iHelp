import React, { createContext, useCallback, useState, useContext } from 'react';
import api from '../services/api';

interface SignInCredentials {
  email: string;
  password: string;
}

interface AuthContextData {
  user: object;
  signIn(credentials: SignInCredentials): Promise<void>;
}

interface AuthState {
  token: string;
  user: object;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider: React.FC = ({ children }) => {
  const [data, setData] = useState<AuthState>(() => {
    const token = localStorage.getItem('@iHelp:token');
    const user = localStorage.getItem('@iHelp:user');

    if (token && user) {
      return { token, user: JSON.parse(user) };
    } else {
      return {} as AuthState;
    }
  });

  const signIn = useCallback(async ({ email, password }) => {
    const res = await api.post('sessions', {
      email,
      password,
    });
    // console.log(res.data);
    const { token, user } = res.data;

    localStorage.setItem('@iHelp:token', token);
    localStorage.setItem('@iHelp:user', JSON.stringify(user));

    setData({ token, user });
  }, []);

  return (
    <AuthContext.Provider value={{ user: data.user, signIn }}>
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth(): AuthContextData {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('userAuth must be used within an AuthProvider');
  }
  return context;
}
