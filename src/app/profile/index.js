import { memo } from 'react';
import Head from '../../components/head';
import PageLayout from '../../components/page-layout';
import ProfileCard from '../../components/profile-card';
import Spinner from '../../components/spinner';
import LocaleSelect from '../../containers/locale-select';
import Navigation from '../../containers/navigation';
import TopHead from '../../containers/top-head';
import useInit from '../../hooks/use-init';
import useSelector from '../../hooks/use-selector';
import useStore from '../../hooks/use-store';
import useTranslate from '../../hooks/use-translate';

function Profile() {
  const store = useStore();

  useInit(() => {
    store.actions.profile.load();
  }, []);

  const select = useSelector(state => ({
    profile: state.profile.data,
    waiting: state.profile.waiting,
  }));

  const {lang, t} = useTranslate();

  return (
    <PageLayout key={lang}>
      <TopHead/>
      <Head title={t('title')}>
        <LocaleSelect/>
      </Head>
      <Navigation/>
      <Spinner active={select.waiting}>
        <ProfileCard data={select.profile}/>
      </Spinner>
    </PageLayout>
  );
}

export default memo(Profile);
