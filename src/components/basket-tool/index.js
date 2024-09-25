import { memo } from 'react';
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import { numberFormat, plural } from '../../utils';
import './style.css';
import Navigation from '../navigation';
import { useIntl } from '../../context/intl-context';

function BasketTool({ sum = 0, amount = 0, onOpen = () => {} }) {
  const { t } = useIntl();
  const cn = bem('BasketTool');
  return (
    <div className={cn('container')}>
      <Navigation />
      <div className={cn()}>
        <span className={cn('label')}>{t('In Cart')}</span>
        <span className={cn('total')}>
          {amount
            ? `${amount} ${plural(amount, {
                one: 'товар',
                few: 'товара',
                many: 'товаров',
              })} / ${numberFormat(sum)} ₽`
            : `${t('empty')}`}
        </span>
        <button onClick={onOpen}>{t('Go to Cart')}</button>
      </div>
    </div>
  );
}

BasketTool.propTypes = {
  onOpen: PropTypes.func.isRequired,
  sum: PropTypes.number,
  amount: PropTypes.number,
};

export default memo(BasketTool);
