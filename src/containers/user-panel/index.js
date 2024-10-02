import React, { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import UserPanelView from '../../components/user-panel-view';
import { useAuth } from '../../hooks/use-auth';
import useTranslate from '../../hooks/use-translate';

const UserPanel = () => {
  const { isUserAuth, user, logout } = useAuth();
  const { t } = useTranslate();
  const navigate = useNavigate();

  const handleLogin = useCallback(() => {
    navigate('/login');
  }, [navigate]);

  const handleLogout = useCallback(() => {
    logout();
    navigate('/');
  }, [logout, navigate]);

  return (
    <UserPanelView
      isUserAuth={isUserAuth}
      user={user}
      onLogin={handleLogin}
      onLogout={handleLogout}
      linkToProfile="/profile"
      t={t}
    />
  );
};

export default React.memo(UserPanel);
