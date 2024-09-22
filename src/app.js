import React, { useCallback, useState } from 'react';
import List from './components/list';
import Controls from './components/controls';
import Head from './components/head';
import PageLayout from './components/page-layout';
import Cart from './components/cart';
import ItemAdd from './components/item/ItemAdd';

/**
 * Приложение
 * @param store {Store} Хранилище состояния приложения
 * @returns {React.ReactElement}
 */
function App({ store }) {
  const list = store.getState().list;
  const cart = store.getState().cart;
  const totalPrice = store.getState().totalPrice;
  const uniqueItems = store.getState().uniqueProductsCount.size;

  const [modalOpen, setModalOpen] = useState(false);

  const callbacks = {
    addToCart: useCallback(
      code => {
        store.addToCart(code);
      },
      [store],
    ),
    deleteFromCart: useCallback(
      code => {
        store.deleteFromCart(code);
      },
      [store],
    ),
  };
  return (
    <PageLayout>
      <Head title="Магазин" />
      <Controls
        totalPrice={totalPrice}
        uniqueItems={uniqueItems}
        action={() => setModalOpen(prev => !prev)}
      />
      <List list={list}>
        {list.map(item => (
          <div key={item.code} className={'item'}>
            <ItemAdd item={item} action={callbacks.addToCart} />
          </div>
        ))}
      </List>
      <Cart
        modalOpen={modalOpen}
        setModalOpen={() => {
          setModalOpen(prev => !prev);
        }}
        title={'Корзина'}
        list={cart}
        type={'cart'}
        totalPrice={totalPrice}
        uniqueItems={uniqueItems}
        action={callbacks.deleteFromCart}
      />
    </PageLayout>
  );
}

export default App;
