import { createFlatCategories } from '../../utils';
import StoreModule from '../module';

class CategoriesState extends StoreModule {
  /**
   * Начальное состояние
   * @return {Object}
   */
  initState() {
    return {
      categories: [],
      waiting: false,
      error: null,
    };
  }

  async loadCategories() {
    this.setState(
      {
        ...this.getState(),
        waiting: true,
      },
      'Установка статуса загрузки списка категорий',
    );

    try {
      const res = await fetch('/api/v1/categories?fields=_id,title,parent(_id)&limit=*');
      const categories = await res.json();

      this.setState(
        {
          ...this.getState(),
          categories: createFlatCategories(categories.result.items),
          waiting: false,
        },
        'Загружен список категорий из АПИ',
      );
    } catch (err) {
      this.setState(
        {
          ...this.getState(),
          waiting: false,
          error: err,
        },
        'Ошибка при загрузке списка категорий',
      );
    }
  }
}

export default CategoriesState;
