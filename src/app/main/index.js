import { memo, useCallback, useEffect } from 'react';
import Item from '../../components/item';
import PageLayout from '../../components/page-layout';
import Head from '../../components/head';
import BasketTool from '../../components/basket-tool';
import List from '../../components/list';
import useStore from '../../store/use-store';
import useSelector from '../../store/use-selector';
import Pagination from '../../components/pagination/index';
import { useIntl } from '../../context/intl-context';
import { ADDRESS_TO_ITEM_PAGE } from '../../store/const';

function Main() {
  const store = useStore();
  const { locale, setLocale, t } = useIntl();
  useEffect(() => {
    store.actions.catalog.load();
  }, []);

  const select = useSelector(state => ({
    list: state.catalog.list,
    amount: state.basket.amount,
    sum: state.basket.sum,
    currentPage: state.catalog.currentPage,
    size: state.catalog.limit,
    total: state.catalog.total,
  }));

  const callbacks = {
    // Добавление в корзину
    addToBasket: useCallback(_id => store.actions.basket.addToBasket(_id), [store]),
    // Открытие модалки корзины
    openModalBasket: useCallback(() => store.actions.modals.open('basket'), [store]),
    loadMorePerPage: useCallback(pageCount => store.actions.catalog.load(pageCount - 1), [store]),
  };

  const renders = {
    item: useCallback(
      item => {
        return <Item item={item} onAdd={callbacks.addToBasket} address={ADDRESS_TO_ITEM_PAGE} />;
      },
      [callbacks.addToBasket],
    ),
  };

  return (
    <PageLayout>
      <Head title={t('Store')} defaultLocale={locale} onChangeLocale={setLocale} />
      <BasketTool onOpen={callbacks.openModalBasket} amount={select.amount} sum={select.sum} />
      <List list={select.list} renderItem={renders.item} />
      <Pagination
        currentPage={select.currentPage + 1}
        size={select.size}
        total={select.total}
        onClick={callbacks.loadMorePerPage}
      />
    </PageLayout>
  );
}

export default memo(Main);
