import { cn as bem } from '@bem-react/classname';
import { NavLink } from 'react-router-dom';
import { useIntl } from '../../context/intl-context';
import './style.css';

const Navigation = () => {
  const { t } = useIntl();
  const cn = bem('Navigation');

  return (
    <nav className={cn()}>
      <ul className={cn('list')}>
        <li>
          <NavLink
            to='/'
            className={cn('link')}
          >
            {t('Home')}
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default Navigation;
