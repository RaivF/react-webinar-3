import { memo, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import Head from '../../components/head';
import LoginForm from '../../components/login-form';
import PageLayout from '../../components/page-layout';
import LocaleSelect from '../../containers/locale-select';
import Navigation from '../../containers/navigation';
import UserPanel from '../../containers/user-panel';
import { useAuth } from '../../hooks/use-auth';
import useTranslate from '../../hooks/use-translate';

function Login() {
  const { login, isPending, error, isSuccess } = useAuth();
  const { t } = useTranslate();
  const navigate = useNavigate();

  const handleLoginSuccess = useCallback(() => navigate('/profile', { replace: true }), [navigate]);

  return (
    <PageLayout>
      <UserPanel />
      <Head title={t('title')}>
        <LocaleSelect />
      </Head>
      <Navigation />

      <LoginForm
        t={t}
        title={t('user.login')}
        onSubmit={login}
        isSubmitting={isPending}
        isSuccess={isSuccess}
        onLoginSuccess={handleLoginSuccess}
        error={error}
      />
    </PageLayout>
  );
}

export default memo(Login);
