import { Registration } from 'components/Registration/Registration';
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
    label: 'Check in',
    path: '/registration',
  },
];
const RegistrationPage = () => {const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('ecomm_userToken');
    if (token) {
      router.push('/');
    }
  }, [router]);

  return (
    <PublicLayout breadcrumb={breadcrumbsData} breadcrumbTitle='Registration'>
      <Registration />
      <Subscribe />
    </PublicLayout>
  );
};

export default RegistrationPage;
