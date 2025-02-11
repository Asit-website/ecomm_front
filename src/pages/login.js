import { Login } from 'components/Login/Login';
import { Subscribe } from 'components/shared/Subscribe/Subscribe';
import { PublicLayout } from 'layout/PublicLayout';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

const breadcrumbsData = [
  {
    label: 'Home',
    path: '/',
  },
  {
    label: 'Log In',
    path: '/login',
  },
];
const LoginPage = () => {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('ecomm_userToken');
    // If the user is authenticated (has a token), redirect to a different page (e.g., homepage or dashboard)
    if (token) {
      router.push('/'); // Redirect to homepage or dashboard
    }
  }, [router]);
  return (
    <PublicLayout breadcrumb={breadcrumbsData} breadcrumbTitle='Log In'>
      <Login />
      <Subscribe />
    </PublicLayout>
  );
};

export default LoginPage;
