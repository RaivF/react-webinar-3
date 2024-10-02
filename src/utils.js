/**
 * Плюрализация
 * Возвращает вариант с учётом правил множественного числа под указанную локаль
 * @param value {Number} Число, под которое выбирается вариант формы.
 * @param variants {Object<String>} Варианты форм множественного числа.
 * @example plural(5, {one: 'товар', few: 'товара', many: 'товаров'})
 * @param [locale] {String} Локаль (код языка)
 * @returns {String}
 */
export function plural(value, variants = {}, locale = 'ru-RU') {
  // Получаем фурму кодовой строкой: 'zero', 'one', 'two', 'few', 'many', 'other'
  // В русском языке 3 формы: 'one', 'few', 'many', и 'other' для дробных
  // В английском 2 формы: 'one', 'other'
  const key = new Intl.PluralRules(locale).select(value);
  // Возвращаем вариант по ключу, если он есть
  return variants[key] || '';
}

/**
 * Генератор чисел с шагом 1
 * @returns {Function}
 */
export function codeGenerator(start = 0) {
  return () => ++start;
}

/**
 * Форматирование разрядов числа
 * @param value {Number}
 * @param options {Object}
 * @returns {String}
 */
export function numberFormat(value, locale = 'ru-RU', options = {}) {
  return new Intl.NumberFormat(locale, options).format(value);
}

function createTreeStructure(items) {
  const tree = {};

  items.forEach(item => {
    const { _id, title, parent } = item;
    const parentId = parent ? parent._id : null;

    if (!tree[parentId]) {
      tree[parentId] = [];
    }

    tree[parentId].push({ _id, title });
  });

  const buildTree = parentId => {
    if (!tree[parentId]) {
      return [];
    }

    return tree[parentId].map(item => ({
      ...item,
      children: buildTree(item._id),
    }));
  };

  return buildTree(null);
}

function createFlatStructure(tree, initial = '', prefix = '- ') {
  const result = [];

  function walkTree(tree, initial = '') {
    for (const node of tree) {
      result.push({
        value: node._id,
        title: initial + node.title,
      });

      if (node.children) {
        walkTree(node.children, initial + prefix);
      }
    }
  }

  walkTree(tree, initial);

  return result;
}

export const createFlatCategories = data => createFlatStructure(createTreeStructure(data));

export function formatError(json) {
  if (!json) return 'Неизвестная ошибка';
  return json?.error?.data?.issues?.[0]?.message || json?.error?.message;
}

export const storage = {
  getToken: () => {
    return window.localStorage.getItem('token');
  },
  setToken: token => {
    window.localStorage.setItem('token', token);
  },
  clearToken: () => {
    window.localStorage.removeItem('token');
  },
};
