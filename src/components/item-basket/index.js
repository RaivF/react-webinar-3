import { memo, useCallback } from 'react';
import propTypes from 'prop-types';
import { numberFormat } from '../../utils';
import { cn as bem } from '@bem-react/classname';
import PropTypes from 'prop-types';
import './style.css';
import { Link } from 'react-router-dom';
import useStore from '../../store/use-store';
import { useIntl } from '../../context/intl-context';

function ItemBasket({ item, onRemove = () => {} }) {
  const store = useStore();
  const cn = bem('ItemBasket');
  const { t } = useIntl();
  const callbacks = {
    onRemove: e => onRemove(item._id),
    // Закрытие любой модалки
    closeModal: useCallback(() => store.actions.modals.close(), [store]),
  };

  return (
    <div className={cn()}>
      <Link to={`/product/${item._id}`}>
        <div className={cn('title')} onClick={callbacks.closeModal}>
          {item.title}
        </div>
      </Link>
      <div className={cn('right')}>
        <div className={cn('cell')}>{numberFormat(item.price)} ₽</div>
        <div className={cn('cell')}>{numberFormat(item.amount || 0)} шт</div>
        <div className={cn('cell')}>
          <button onClick={callbacks.onRemove}>{t('Remove')}</button>
        </div>
      </div>
    </div>
  );
}

ItemBasket.propTypes = {
  item: PropTypes.shape({
    _id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    title: PropTypes.string,
    price: PropTypes.number,
    amount: PropTypes.number,
  }).isRequired,
  onRemove: propTypes.func,
};

export default memo(ItemBasket);
