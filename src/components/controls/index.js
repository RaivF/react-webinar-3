import { memo } from 'react';
import PropTypes from 'prop-types';
import './style.css';
import { useIntl } from '../../context/intl-context';

function Controls({ onAdd = () => {} }) {
  const { t } = useIntl();
  return (
    <div className="Controls">
      <button onClick={() => onAdd()}>{t('Add')}</button>
    </div>
  );
}

Controls.propTypes = {
  onAdd: PropTypes.func,
};

export default memo(Controls);
