import React from 'react';
import PropTypes from 'prop-types';
import { formatCurrency, pluralForm } from '../../utils';
import { cn as bem } from '@bem-react/classname';
import './style.css';

const CartStats = ({ totalPrice = 0, uniqueItems = 0 }) => {
  const cn = bem('CartStats');
  const itemsLabel = pluralForm(uniqueItems, { one: 'товар', few: 'товара', many: 'товаров' });
  const formattedPrice = formatCurrency(totalPrice);

  return (
    <div className={cn()}>
      В корзине:
      {uniqueItems == 0 && <span className={cn('values')}>пусто</span>}
      {uniqueItems != 0 && (
        <span className={cn('values')}>{`${uniqueItems} ${itemsLabel} / ${formattedPrice}`}</span>
      )}
    </div>
  );
};

CartStats.propTypes = {
  totalPrice: PropTypes.number,
  uniqueItems: PropTypes.number,
};

export default React.memo(CartStats);
