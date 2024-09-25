import { codeGenerator } from '../../utils';
import { PAGE_LIMIT } from '../const';
import StoreModule from '../module';

class Catalog extends StoreModule {
  constructor(store, name) {
    super(store, name);
    this.generateCode = codeGenerator(0);
  }

  initState() {
    return {
      list: [],
      currentPage: 0,
      limit: PAGE_LIMIT,
      total: 0,
      product: {},
    };
  }
  async load(currentPage = 0, limit = PAGE_LIMIT) {
    const response = await fetch(
      `/api/v1/articles?limit=${limit}&skip=${currentPage * limit}&fields=items(_id, title, price),count`,
    );
    const json = await response.json();
    this.setState(
      {
        ...this.getState(),
        list: json.result.items,
        currentPage,
        limit,
        total: json.result.count,
      },
      'Загружены товары из АПИ',
    );
  }

  async fetchProductById(id) {
    const response = await fetch(
      `/api/v1/articles/${id}?fields=_id,title,description,price,edition,madeIn(title,code),category(title)`,
    );
    const json = await response.json();
    console.log(json);
    this.setState(
      {
        ...this.getState(),
        product: json.result,
      },
      `Загружен товар по id ${id} из АПИ`,
    );
  }
}

export default Catalog;
