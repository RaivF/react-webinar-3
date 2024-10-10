import { memo } from 'react';
import Head from '../../components/head';
import PageLayout from '../../components/page-layout';
import CatalogFilter from '../../containers/catalog-filter';
import CatalogList from '../../containers/catalog-list';
import LocaleSelect from '../../containers/locale-select';
import Navigation from '../../containers/navigation';
import TopHead from '../../containers/top-head';
import useInit from '../../hooks/use-init';
import useStore from '../../hooks/use-store';
import useTranslate from '../../hooks/use-translate';

function Main() {

  const store = useStore();
  const {lang, t} = useTranslate();

  useInit(async () => {
    await Promise.all([
      store.actions.catalog.initParams(),
      store.actions.categories.load()
    ]);
  }, [lang], true);

  return (
    <PageLayout key={lang}>
      <TopHead/>
      <Head title={t('title')}>
        <LocaleSelect/>
      </Head>
      <Navigation/>
      <CatalogFilter/>
      <CatalogList/>
    </PageLayout>
  );
}

export default memo(Main);
