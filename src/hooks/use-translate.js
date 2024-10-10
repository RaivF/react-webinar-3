import { useEffect, useMemo, useSyncExternalStore } from 'react';
import useServices from './use-services';

/**
 * Хук возвращает функцию для локализации текстов, код языка и функцию его смены
 */
export default function useTranslate() {
  const i18nService = useServices().i18n
  const apiService = useServices().api

  const unsubscribe = useMemo(() => {
    return i18nService.subscribe((state) => {
      apiService.setHeader('Accept-Language', state)
    });
  }, []);

  useEffect(() => unsubscribe, [unsubscribe]);

  const state = useSyncExternalStore(i18nService.subscribe, i18nService.getState);

  return {
    lang: state,
    setLang: i18nService.setLang,
    t: i18nService.t
  };
}
