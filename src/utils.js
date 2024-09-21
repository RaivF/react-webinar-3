/**
 * Выбор формы множественного числа в зависимости от числа.
 *
 * @param {number} value - Число, под которое выбирается вариант формы.
 * @param {Object} variants - Варианты форм множественного числа.
 * @param {string} [locale='ru-RU'] - Локаль (код языка).
 * @returns {string} - Возвращенный вариант формы множественного числа.
 *
 * @example pluralForm(5, {one: 'товар', few: 'товара', many: 'товаров'})
 */
export function pluralForm(value, variants = {}, locale = 'ru-RU') {
  const pluralRule = new Intl.PluralRules(locale).select(value);
  return variants[pluralRule] || '';
}

/**
 * Генератор чисел с шагом 1 на основе замыкания.
 *
 * @param {number} [initialValue=0] - Начальное значение для генератора.
 * @returns {function(): number} - Функция, возвращающая следующее значение.
 */
export function createIncrementalGenerator(initialValue = 0) {
  let counter = initialValue;
  return function () {
    return ++counter;
  };
}

export const generateCode = createIncrementalGenerator();

/**
 * Генератор чисел с шагом 1 с использованием генераторов.
 *
 * @param {number} [initialValue=0] - Начальное значение для генератора.
 * @returns {function(): number} - Функция, возвращающая следующее значение из генератора.
 */
export function createGenerator(initialValue = 0) {
  function* numberGenerator(start) {
    while (true) {
      yield ++start;
    }
  }

  const generator = numberGenerator(initialValue);
  return function () {
    return generator.next().value;
  };
}

export const generateCodeWithGenerator = createGenerator();

/**
 * Генератор чисел с шагом 1 с использованием статической переменной.
 *
 * @returns {number} - Следующее значение.
 */
export function generateCodeWithStaticVariable() {
  if (!generateCodeWithStaticVariable.value) {
    generateCodeWithStaticVariable.value = 1;
  } else {
    generateCodeWithStaticVariable.value++;
  }
  return generateCodeWithStaticVariable.value;
}

/**
 * Форматирование цены с учетом локали и валюты.
 *
 * @param {number} price - Цена для форматирования.
 * @param {string} [locale='ru-RU'] - Локаль для форматирования.
 * @param {string} [currency='RUB'] - Валюта для форматирования.
 * @param {number} [minimumFractionDigits=0] - Количество знаков после запятой.
 * @returns {string} - Отформатированная цена.
 *
 * @example formatCurrency(5, 'ru-RU', 'RUB', 2) // 5,00 ₽
 */
export function formatCurrency(
  price,
  locale = 'ru-RU',
  currency = 'RUB',
  minimumFractionDigits = 0,
) {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
    minimumFractionDigits,
  }).format(price);
}
