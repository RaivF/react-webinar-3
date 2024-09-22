import React from 'react';
import PropTypes from 'prop-types';
import './style.css';
import { cn as bem } from '@bem-react/classname';
import Modal from '../modal';
import Head from '../head';
import List from '../list';
import Result from '../result';
import ItemRemove from '../item/ItemRemove';

function Cart(props) {
  const {
    setModalOpen = () => {},
    action = () => {},
    modalOpen = false,
    title = 'modal',
    list = [],
    type = 'list',
    uniqueItems = 0,
    totalPrice = 0,
    ...resProps
  } = props;
  const cn = bem('Cart');

  return (
    <div className={cn()}>
      <Modal active={props.modalOpen} setModalOpen={props.setModalOpen}>
        <Head title={props.title} />

        <List list={props.list} type={props.type} action={props.action} />
        {list.map(item => {
          if (item.count) {
            return (
              <div key={item.code} className={cn('item')}>
                <ItemRemove item={item} action={action} />
              </div>
            );
          }
        })}

        {(!!props.uniqueItems && <Result totalPrice={props.totalPrice} />) ||
          (props.type !== 'list' && <div className={cn({ empty: true })}>Ваша корзина пуста!</div>)}
        <button className={cn('button')} onClick={setModalOpen}>
          Закрыть
        </button>
      </Modal>
    </div>
  );
}

Cart.propTypes = {
  setOpen: PropTypes.func,
  action: PropTypes.func,
  modalOpen: PropTypes.bool,
  title: PropTypes.string,
  list: PropTypes.array,
  type: PropTypes.string,
  uniqueProductsCount: PropTypes.number,
  totalPrice: PropTypes.number,
};

export default Cart;
