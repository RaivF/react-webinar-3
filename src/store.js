import { generateCode } from './utils';

/**
 * Хранилище состояния приложения
 */
class Store {
  constructor(initState = {}) {
    this.state = {
      cart: [], // Состояние корзины
      ...initState,
    };
    this.listeners = []; // Слушатели изменений состояния
  }

  /**
   * Подписка слушателя на изменения состояния
   * @param listener {Function}
   * @returns {Function} Функция отписки
   */
  subscribe(listener) {
    this.listeners.push(listener);
    // Возвращается функция для удаления добавленного слушателя
    return () => {
      this.listeners = this.listeners.filter(item => item !== listener);
    };
  }

  /**
   * Выбор состояния
   * @returns {Object}
   */
  getState() {
    return this.state;
  }

  /**
   * Установка состояния
   * @param newState {Object}
   */
  setState(newState) {
    this.state = newState;
    // Вызываем всех слушателей
    for (const listener of this.listeners) listener();
  }

  /**
   * Добавление товара в корзину
   * @param item {Object} Товар, который нужно добавить в корзину
   */
  addToCart(item) {
    const cartItem = this.state.cart.find(cartItem => cartItem.code === item.code);
    if (cartItem) {
      // Если товар уже есть в корзине, увеличиваем его количество
      cartItem.quantity += 1;
    } else {
      // Если товара нет в корзине, добавляем его с количеством 1
      this.state.cart.push({ ...item, quantity: 1 });
    }
    this.setState({ ...this.state });
  }

  /**
   * Удаление товара из корзины
   * @param code {Number} Код товара, который нужно удалить из корзины
   */
  removeFromCart(code) {
    this.setState({
      ...this.state,
      list: [...this.state.list, { code: generateCode(), title: 'Новая запись' }],
    });
  }

  /**
   * Получение общего количества товаров в корзине
   * @returns {Number} Общее количество уникальных товаров в корзине
   */
  deleteItem(code) {
    this.setState({
      ...this.state,
      // Новый список, в котором не будет удаляемой записи
      list: this.state.list.filter(item => item.code !== code),
    });
  }

  /**
   * Получение общей суммы всех товаров в корзине
   * @returns {Number} Общая сумма товаров
   */
  /**
   * Выделение записи по коду
   * @param code
   */

  // В методе selectItem добавил логику для подсчёта выделений
  selectItem(code) {
    this.setState({
      ...this.state,
      list: this.state.list.map(item => {
        if (item.code === code) {
          // Смена выделения и подсчёт
          return {
            ...item,
            selected: !item.selected,
            count: item.selected ? item.count : item.count + 1 || 1,
          };
        }
        // Сброс выделения если выделена
        return item.selected ? { ...item, selected: false } : item;
      }),
    });
  }
}

export default Store;
