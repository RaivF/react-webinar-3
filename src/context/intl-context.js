/* eslint-disable react/prop-types */
import React, { useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { WORDS_MAP } from '../store/const';

const IntlContext = React.createContext();

export const IntlProvider = ({ children }) => {
  const [locale, setLocale] = useState('');

  useEffect(() => {
    const browserLocale = navigator.language.split('-')[0];

    if (browserLocale === 'en' || browserLocale === 'ru') {
      setLocale(browserLocale);
    } else {
      setLocale('en');
    }
  }, []);

  const translate = useCallback(
    text => {
      if (locale === 'en') {
        return text;
      }
      if (locale === 'ru') {
        return WORDS_MAP.ru[text];
      }
    },
    [locale],
  );

  const value = useMemo(() => ({ locale, setLocale, translate }), [locale, translate]);

  // prettier-ignore
  return (
    <IntlContext.Provider value={value}>
      {children}
    </IntlContext.Provider>
  );
};

export const useIntl = () => {
  const context = useContext(IntlContext);

  if (!context) {
    throw new Error('useIntl must be used within an IntlProvider');
  }

  const { locale, setLocale, translate } = context;

  return {
    locale,
    setLocale,
    t: translate,
  };
};
