import { useCallback, useEffect } from 'react';
import useSelector from '../hooks/use-selector';
import useStore from '../hooks/use-store';
import { useNavigate } from 'react-router-dom';

export const useAuth = () => {
  const store = useStore();

  const select = useSelector(state => ({
    user: state.auth?.data,
    token: state.auth?.token,
    isPending: state.auth?.isPending,
    error: state.auth?.error,
    isSuccess: state.auth?.isSuccess,
    isInitialAuth: state.auth?.isInitialAuth,
  }));

  useEffect(() => {
    store.actions.auth.authMe();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const callbacks = {
    login: useCallback(data => store.actions.auth.login(data), [store]),
    logout: useCallback(() => store.actions.auth.logout(), [store]),
  };

  return {
    user: select.user,
    token: select.token,
    isPending: select.isPending,
    error: select.error,
    isSuccess: select.isSuccess,
    login: callbacks.login,
    logout: callbacks.logout,
    isUserAuth: Boolean(select.token) || Object.keys(select.user ?? {}).length > 0,
    isInitialAuth: select.isInitialAuth,
  };
};
