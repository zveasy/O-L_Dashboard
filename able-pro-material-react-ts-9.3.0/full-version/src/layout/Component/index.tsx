import { lazy, Suspense } from 'react';

// material-ui
import Container from '@mui/material/Container';
import Toolbar from '@mui/material/Toolbar';

// project-imports
import ComponentLayoutPage from './ComponentLayout';
import { useGetMenuMaster } from 'api/menu';
import Loader from 'components/Loader';

const Header = lazy(() => import('./Header'));

// ==============================|| MINIMAL LAYOUT ||============================== //

export default function ComponentLayout() {
  const { menuMasterLoading } = useGetMenuMaster();
  if (menuMasterLoading) return <Loader />;

  return (
    <>
      <Suspense fallback={<Loader />}>
        <Container maxWidth="xl" sx={{ px: { xs: 0, sm: 2.5 } }}>
          <Header />
          <Toolbar sx={{ mt: 2 }} />
          <ComponentLayoutPage />
        </Container>
      </Suspense>
    </>
  );
}
