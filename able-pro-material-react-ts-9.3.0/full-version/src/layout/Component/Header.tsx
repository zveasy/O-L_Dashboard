import { cloneElement, ReactElement } from 'react';
import { Link as RouterLink } from 'react-router-dom';

// material-ui
import { alpha, useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import useScrollTrigger from '@mui/material/useScrollTrigger';
import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import Container from '@mui/material/Container';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import Toolbar from '@mui/material/Toolbar';
import Box from '@mui/material/Box';

// project-imports
import { handlerComponentDrawer, useGetMenuMaster } from 'api/menu';
import IconButton from 'components/@extended/IconButton';
import AnimateButton from 'components/@extended/AnimateButton';
import Logo from 'components/logo';
import { ThemeDirection, APP_DEFAULT_PATH } from 'config';
import useAuth from 'hooks/useAuth';
import { useIspValue } from 'hooks/useIspValue';

// assets
import { ExportSquare, HambergerMenu } from 'iconsax-react';
import GithubIcon from 'assets/third-party/github';

// types

interface ElevationScrollProps {
  children: ReactElement;
  window?: Window | Node;
}

// elevation scroll
function ElevationScroll({ children, window }: ElevationScrollProps) {
  const theme = useTheme();
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 10,
    target: window ? window : undefined
  });

  return cloneElement(children, {
    style: {
      boxShadow: trigger ? '0 8px 6px -10px rgba(0, 0, 0, 0.5)' : 'none',
      backgroundColor: trigger ? alpha(theme.palette.background.default, 0.8) : alpha(theme.palette.background.default, 0.1)
    }
  });
}

// ==============================|| COMPONENTS - APP BAR ||============================== //

export default function Header() {
  const { isLoggedIn } = useAuth();
  const downMD = useMediaQuery((theme) => theme.breakpoints.down('md'));

  const { menuMaster } = useGetMenuMaster();

  const ispValueAvailable = useIspValue();

  const url = ispValueAvailable ? 'https://1.envato.market/OrJ5nn' : 'https://1.envato.market/zNkqj6';

  return (
    <ElevationScroll>
      <AppBar
        sx={(theme) => ({
          bgcolor: alpha(theme.palette.background.default, 0.8),
          backdropFilter: 'blur(8px)',
          color: 'text.primary',
          boxShadow: 'none'
        })}
      >
        <Container maxWidth="xl" disableGutters={downMD}>
          <Toolbar sx={{ px: { xs: 1.5, sm: 4, md: 0, lg: 0 }, py: 1 }}>
            <Stack direction="row" sx={{ alignItems: 'center', flexGrow: 1, display: { xs: 'none', md: 'block' } }}>
              <Box sx={{ display: 'inline-block' }}>
                <Logo to="/" />
              </Box>
              <Chip
                label={import.meta.env.VITE_APP_VERSION}
                variant="outlined"
                size="small"
                color="secondary"
                sx={{ mt: 0.5, ml: 1, fontSize: '0.725rem', height: 20, '& .MuiChip-label': { px: 0.5 } }}
              />
            </Stack>
            <Box
              sx={{
                '& .header-link': { '&:hover': { color: 'primary.main' }, ml: 3, fontWeight: 500 },
                '& .header-button': { ml: 3 },
                display: { xs: 'none', md: 'block' }
              }}
            >
              <Link
                className="header-link"
                sx={(theme) => ({ ml: theme.direction === ThemeDirection.RTL ? 3 : 0 })}
                color="secondary.main"
                component={RouterLink}
                to={ispValueAvailable ? '/login?isp=1' : '/login'}
                target="_blank"
                underline="none"
              >
                Dashboard
              </Link>
              <Link
                className="header-link"
                color="primary"
                component={RouterLink}
                to={ispValueAvailable ? '/components-overview/buttons?isp=1' : '/components-overview/buttons'}
                underline="none"
              >
                Components
              </Link>
              <Link
                className="header-link"
                color="secondary.main"
                href="https://phoenixcoded.gitbook.io/able-pro"
                target="_blank"
                underline="none"
              >
                Documentation
              </Link>
              <Link
                href="https://github.com/phoenixcoded/able-pro-free-admin-dashboard-template"
                target="_blank"
                underline="none"
                className="header-button"
              >
                <IconButton
                  size="large"
                  shape="rounded"
                  color="secondary"
                  sx={(theme) => ({
                    bgcolor: 'secondary.light',
                    color: 'secondary.darker',
                    '&:hover': {
                      color: 'secondary.lighter',
                      bgcolor: 'grey.800',
                      svg: { stroke: theme.palette.common.white },
                      ...theme.applyStyles('dark', { color: 'grey.500' })
                    }
                  })}
                >
                  <GithubIcon />
                </IconButton>
              </Link>
              <Box sx={{ display: 'inline-block', ml: 3 }}>
                <AnimateButton>
                  <Button
                    component={Link}
                    href={url}
                    target="_blank"
                    disableElevation
                    startIcon={<ExportSquare />}
                    color="success"
                    size="large"
                    variant="contained"
                  >
                    Purchase Now
                  </Button>
                </AnimateButton>
              </Box>
            </Box>
            <Box
              sx={{
                width: '100%',
                alignItems: 'center',
                justifyContent: 'space-between',
                display: { xs: 'flex', md: 'none' }
              }}
            >
              <Box sx={{ display: 'inline-block' }}>
                <Logo to="/" />
              </Box>
              <Stack direction="row" sx={{ gap: 2 }}>
                <Button
                  variant="outlined"
                  color="warning"
                  component={RouterLink}
                  to={
                    isLoggedIn
                      ? ispValueAvailable
                        ? `${APP_DEFAULT_PATH}?isp=1`
                        : APP_DEFAULT_PATH
                      : ispValueAvailable
                        ? '/login?isp=1'
                        : '/login'
                  }
                  sx={{ mt: 0.25 }}
                >
                  {isLoggedIn ? 'Dashboard' : 'Login'}
                </Button>

                <IconButton
                  size="large"
                  color="secondary"
                  onClick={() => handlerComponentDrawer(!menuMaster.isComponentDrawerOpened)}
                  sx={{ p: 1 }}
                >
                  <HambergerMenu />
                </IconButton>
              </Stack>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
    </ElevationScroll>
  );
}
