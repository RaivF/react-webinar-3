import PropTypes from 'prop-types';
import React from 'react';
import { Link } from 'react-router-dom';
import './style.css';

const UserPanelView = ({ isUserAuth, user, onLogin, onLogout, linkToProfile, t }) => {
  return (
    <div className="UserPanel">
      {isUserAuth && (
        <Link to={linkToProfile} className="UserPanel-link">
          {user?.profile?.name}
        </Link>
      )}

      {isUserAuth ? (
        <button onClick={onLogout}>{t('user.logout')}</button>
      ) : (
        <button onClick={onLogin}>{t('user.login')}</button>
      )}
    </div>
  );
};

UserPanelView.propTypes = {
  isUserAuth: PropTypes.bool.isRequired,
  user: PropTypes.shape({ profile: PropTypes.shape({ name: PropTypes.string }) }).isRequired,
  onLogin: PropTypes.func.isRequired,
  onLogout: PropTypes.func.isRequired,
  linkToProfile: PropTypes.string.isRequired,
  t: PropTypes.func.isRequired,
};

export default React.memo(UserPanelView);
