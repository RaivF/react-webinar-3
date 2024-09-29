import { cn as bem } from '@bem-react/classname';
import PropTypes from 'prop-types';
import React, { useEffect } from 'react';
import { useIntl } from '../../context/intl-context';
import { numberFormat } from '../../utils';
import './style.css';
import { useLocation, useNavigate } from 'react-router-dom';

const ProductCard = ({ item, onAddProduct }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const loc = location.pathname.split('/')[1];
  console.log(loc);

  // useEffect(() => {
  //   if (loc === 'product') {
  //     navigate('/');
  //   }
  // }, []);

  const { t } = useIntl();
  const cn = bem('ProductCard');

  const { _id, description, price, madeIn, edition, category } = item ?? {};
  const { title: madeInTitle, code } = madeIn ?? {};
  const { title: categoryTitle } = category ?? {};

  return (
    <article className={cn()}>
      <p>{description}</p>
      <p>
        Страна производитель:{' '}
        <strong>
          {madeInTitle} ({code})
        </strong>
      </p>
      <p>
        Категория: <strong>{categoryTitle}</strong>
      </p>
      <p>
        Год выпуска: <strong>{edition}</strong>
      </p>
      <p className={cn('price')}>
        <strong>Цена: {numberFormat(price)} ₽</strong>
      </p>

      <button className={cn('button')} onClick={() => onAddProduct(_id)}>
        {t('Add')}
      </button>
    </article>
  );
};

ProductCard.propTypes = {
  item: PropTypes.object.isRequired,
  onAddProduct: PropTypes.func.isRequired,
};

export default React.memo(ProductCard);
