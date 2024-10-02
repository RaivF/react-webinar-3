import { memo } from 'react';
import Head from '../../components/head';
import PageLayout from '../../components/page-layout';
import CatalogFilter from '../../containers/catalog-filter';
import CatalogList from '../../containers/catalog-list';
import LocaleSelect from '../../containers/locale-select';
import Navigation from '../../containers/navigation';
import UserPanel from '../../containers/user-panel';
import useInit from '../../hooks/use-init';
import useStore from '../../hooks/use-store';
import useTranslate from '../../hooks/use-translate';

/**
 * Главная страница - первичная загрузка каталога
 */
function Main() {
  const store = useStore();

  // prettier-ignore
  useInit(() => {
    store.actions.catalog.initParams();
    store.actions.categories.loadCategories();
  }, [], true);

  const { t } = useTranslate();

  return (
    <PageLayout>
      <UserPanel />
      <Head title={t('title')}>
        <LocaleSelect />
      </Head>
      <Navigation />
      <CatalogFilter />
      <CatalogList />
    </PageLayout>
  );
}

export default memo(Main);
