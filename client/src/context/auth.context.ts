import { createContext } from 'react';

import { IUseAuth } from '../hooks/auth.hook';

export interface IAuthContext extends Omit<IUseAuth, 'ready'> {
  isAuthenticated: boolean;
}

function noop(): void {}

export const AuthContext = createContext({
  token: null,
  userId: null,
  login: noop,
  logout: noop,
  isAuthenticated: false,
} as IAuthContext);
