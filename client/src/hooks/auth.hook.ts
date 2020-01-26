import { useState, useCallback, useEffect } from 'react';

type TLogin = (jvtToken: string, id: string) => void;
type TLogout = () => void;
type TToken = string | null;
type TUserId = string | null;

interface IData {
  token: TToken;
  userId: TUserId;
}

type TData = null | string | IData;

export interface IUseAuth {
  login: TLogin;
  logout: TLogout;
  token: TToken;
  userId: TUserId;
  ready: boolean;
}

const storageName = 'userData';

export const useAuth = (): IUseAuth => {
  const [token, setToken] = useState<TToken>(null);
  const [ready, setReady] = useState<boolean>(false);
  const [userId, setUserId] = useState<TUserId>(null);

  const login: TLogin = useCallback((jvtToken: TToken, id: TUserId) => {
    setToken(jvtToken);
    setUserId(id);

    localStorage.setItem(
      storageName,
      JSON.stringify({ userId: id, token: jvtToken }),
    );
  }, []);

  useEffect(() => {
    const localStorageItem = localStorage.getItem(storageName) || '';

    if (localStorageItem) {
      const data = JSON.parse(localStorageItem);

      if (data && data.token) {
        login(data.userId, data.token);
      }
    }

    setReady(true);
  }, [login]); // в зависимостях используем login, поэтому его и оборачивали в useCallback

  const logout: TLogout = useCallback(() => {
    setToken(null);
    setUserId(null);

    localStorage.removeItem(storageName);
  }, []);

  return { login, logout, token, userId, ready } as IUseAuth;
};
