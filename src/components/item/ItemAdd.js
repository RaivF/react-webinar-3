import React from 'react';
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import './style.css';
import { formatCurrency } from '../../utils';

function ItemAdd({ item, action }) {
  const cn = bem('ItemAdd');

  return (
    <div className={cn()}>
      <div className={cn('code')}>{item.code}</div>
      <div className={cn('title')}>{item.title}</div>
      <div className={cn('price')}>{formatCurrency(item.price)}</div>
      <div className={cn('actions')}>
        <button onClick={() => action(item.code)}>Добавить</button>
      </div>
    </div>
  );
}

ItemAdd.propTypes = {
  item: PropTypes.shape({
    code: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
  }).isRequired,
  action: PropTypes.func.isRequired,
};

export default React.memo(ItemAdd);
