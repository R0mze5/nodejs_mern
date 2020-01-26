import { useState, useCallback } from 'react';

export interface IUseHttpp {
  loading: boolean;
  request: any;
  error: any;
  clearError: () => void;
}

export const useHttp = (): IUseHttpp => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // используем useCallback, чтоб react не входил в рекурсию
  const proxy: string | null = process.env.REACT_APP_PROXY || null;
  const request = useCallback(
    async (url, method = 'GET', body = null, headers = {}) => {
      setLoading(true);

      if (body) {
        body = JSON.stringify(body);
        headers['Content-Type'] = 'application/json';
      }
      try {
        const response = await fetch(proxy ? proxy + url : url, {
          method,
          body,
          headers,
        });
        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || 'something wrong');
        }

        setLoading(false);
        return data;
      } catch (error) {
        setLoading(false);
        setError(error.message);
        throw error;
      }
    },
    [proxy],
  );

  const clearError = useCallback(() => setError(null), []);

  return { loading, request, error, clearError };
};

export default useHttp;
