import { cn as bem } from '@bem-react/classname';
import PropTypes from 'prop-types';
import { memo } from 'react';
import './style.css';

const UserProfileCard = ({ user, title, t }) => {
  const cn = bem('UserProfileCard');

  return (
    <section className={cn()}>
      <h2 className={cn('title')}>{title}</h2>

      <div className={cn('info')}>
        <div className={cn('name')}>
          {t('user.name')}: <strong>{user.profile?.name}</strong>
        </div>
        <div className={cn('phone')}>
          {t('user.phone')}: <strong>{user.profile?.phone}</strong>
        </div>
        <div className={cn('email')}>
          email: <strong>{user.email}</strong>
        </div>
      </div>
    </section>
  );
};

UserProfileCard.propTypes = {
  user: PropTypes.shape({
    email: PropTypes.string,
    profile: PropTypes.shape({
      name: PropTypes.string,
      phone: PropTypes.string,
    }),
  }).isRequired,
  title: PropTypes.string.isRequired,
  t: PropTypes.func.isRequired,
};

export default memo(UserProfileCard);
