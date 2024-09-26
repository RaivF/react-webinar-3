import { memo, useState } from 'react';
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import { numberFormat } from '../../utils';
import './style.css';
import { Link } from 'react-router-dom';
import { useIntl } from '../../context/intl-context';

function Item({ item, onAdd = () => {} }) {
  const cn = bem('Item');
  const { t } = useIntl();
  const callbacks = {
    onAdd: e => onAdd(item._id),
  };

  return (
    <div className={cn()}>
      <Link to={`/product/${item._id}`}>
        <div className={cn('title')}>{item.title}</div>
      </Link>
      <div className={cn('actions')}>
        <div className={cn('price')}>{numberFormat(item.price)} ₽</div>
        <button onClick={callbacks.onAdd}>{t('Add')}</button>
      </div>
    </div>
  );
}

Item.propTypes = {
  item: PropTypes.shape({
    _id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    title: PropTypes.string,
    price: PropTypes.number,
  }).isRequired,
  onAdd: PropTypes.func,
};

export default memo(Item);
