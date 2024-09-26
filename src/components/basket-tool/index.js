import { memo, useCallback } from 'react';
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import { numberFormat, plural } from '../../utils';
import './style.css';
import Navigation from '../navigation';
import { useIntl } from '../../context/intl-context';
import useStore from '../../store/use-store';

function BasketTool({ sum = 0, amount = 0, onOpen = () => {} }) {
  const { t } = useIntl();
  const cn = bem('BasketTool');
  const store = useStore();
  const callbacks = {
    loadMorePerPage: useCallback(pageCount => store.actions.catalog.load(pageCount - 1), [store]),
  };
  return (
    <div className={cn('container')}>
      <Navigation onClick={callbacks.loadMorePerPage} />
      <div className={cn()}>
        <span className={cn('label')}>{t('In Cart')}</span>
        <span className={cn('total')}>
          {amount
            ? `${amount} ${plural(amount, {
                one: t('one'),
                few: t('other'),
                many: t('many'),
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
