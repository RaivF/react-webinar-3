import { memo, useCallback, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import BasketTool from '../../components/basket-tool';
import Head from '../../components/head';
import Navigation from '../../components/navigation';
import PageLayout from '../../components/page-layout';
import ProductCard from '../../components/product-card';
import { useIntl } from '../../context/intl-context';
import useSelector from '../../store/use-selector';
import useStore from '../../store/use-store';

function Product() {
  const store = useStore();
  const { locale, setLocale } = useIntl();
  const { id } = useParams();

  const select = useSelector(state => ({
    amount: state.basket.amount,
    sum: state.basket.sum,
    product: state.catalog.product,
  }));

  const callbacks = {
    // Добавление в корзину
    addToBasket: useCallback(_id => store.actions.basket.addToBasket(_id), [store]),
    // Открытие модалки корзины
    openModalBasket: useCallback(() => store.actions.modals.open('basket'), [store]),
    fetchProductById: useCallback(_id => store.actions.catalog.fetchProductById(_id), [store]),
  };

  useEffect(() => {
    callbacks.fetchProductById(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  return (
    <PageLayout>
      <>
        <Head title={select.product.title} onChangeLocale={setLocale} defaultLocale={locale} />

        <BasketTool onOpen={callbacks.openModalBasket} amount={select.amount} sum={select.sum} />

        <ProductCard item={select.product} onAddProduct={callbacks.addToBasket} />
      </>
    </PageLayout>
  );
}

export default memo(Product);
