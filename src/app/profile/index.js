import { memo } from 'react';
import Head from '../../components/head';
import PageLayout from '../../components/page-layout';
import Spinner from '../../components/spinner';
import UserProfileCard from '../../components/user-profile-card';
import LocaleSelect from '../../containers/locale-select';
import Navigation from '../../containers/navigation';
import UserPanel from '../../containers/user-panel';

import useSelector from '../../hooks/use-selector';
import useStore from '../../hooks/use-store';
import useTranslate from '../../hooks/use-translate';

function Profile() {
  const select = useSelector(state => ({
    user: state.user.data,
    isPending: state.user.isPending,
    isInitialAuth: state.auth.isInitialAuth,
    isAuthPending: state.auth.isPending,
  }));

  const { t } = useTranslate();

  return (
    <PageLayout>
      <UserPanel />
      <Head title={t('title')}>
        <LocaleSelect />
      </Head>
      <Navigation />

      <Spinner active={select.isPending}>
        <UserProfileCard user={select.user} title={t('user.profile')} t={t} />
      </Spinner>
    </PageLayout>
  );
}

export default memo(Profile);
