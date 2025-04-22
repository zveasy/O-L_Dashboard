import { useState, cloneElement, ReactElement, MouseEvent } from 'react';
import { Link as RouterLink } from 'react-router-dom';

// material-ui
import { alpha, useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import useScrollTrigger from '@mui/material/useScrollTrigger';
import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
import CardMedia from '@mui/material/CardMedia';
import Chip from '@mui/material/Chip';
import Collapse from '@mui/material/Collapse';
import Container from '@mui/material/Container';
import Drawer from '@mui/material/Drawer';
import Link from '@mui/material/Link';
import List from '@mui/material/List';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Menu from '@mui/material/Menu';
import Stack from '@mui/material/Stack';
import Toolbar from '@mui/material/Toolbar';
import Tooltip from '@mui/material/Tooltip';
import Box from '@mui/material/Box';

// project-imports
import AnimateButton from 'components/@extended/AnimateButton';
import Dot from 'components/@extended/Dot';
import IconButton from 'components/@extended/IconButton';
import { handlerComponentDrawer, useGetMenuMaster } from 'api/menu';
import Logo from 'components/logo';
import { ThemeDirection } from 'config';
import { techData } from 'data/tech-data';
import { useIspValue } from 'hooks/useIspValue';

// assets
import { ArrowDown2, ArrowUp2, ExportSquare, HambergerMenu, Minus } from 'iconsax-react';
import GithubIcon from 'assets/third-party/github';

interface ElevationScrollProps {
  layout: string;
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

interface Props {
  layout?: string;
}

// ==============================|| COMPONENTS - APP BAR ||============================== //

export default function Header({ layout = 'landing', ...others }: Props) {
  const downMD = useMediaQuery((theme) => theme.breakpoints.down('md'));
  const [drawerToggle, setDrawerToggle] = useState<boolean>(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const [openDrawer, setOpenDrawer] = useState(false);

  const { menuMaster } = useGetMenuMaster();

  /** Method called on multiple components with different event types */
  const drawerToggler = (open: boolean) => (event: any) => {
    if (event.type! === 'keydown' && (event.key! === 'Tab' || event.key! === 'Shift')) {
      return;
    }
    setDrawerToggle(open);
  };
  const ispValueAvailable = useIspValue();

  const url = ispValueAvailable ? 'https://1.envato.market/OrJ5nn' : 'https://1.envato.market/zNkqj6';

  const handleClick = (event: MouseEvent<HTMLAnchorElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const MobileMenuListItem = techData.map((item, index) => {
    const finalUrl = item.url !== '#!' && ispValueAvailable ? `${item.url}?isp=1` : item.url;
    return (
      <ListItemButton
        key={index}
        component={item.label === 'React MUI' ? RouterLink : 'a'}
        {...(item.label === 'React MUI' ? { to: finalUrl } : { href: finalUrl })}
        target={item.target}
        sx={{ p: 0 }}
      >
        <ListItemIcon>
          <Dot size={4} color="secondary" />
        </ListItemIcon>
        <ListItemText primary={item.label} slotProps={{ primary: { variant: 'h6', color: 'secondary.main' } }} />
      </ListItemButton>
    );
  });

  const listItems = techData.map((item, index) => {
    const finalUrl = item.url !== '#!' && ispValueAvailable ? `${item.url}?isp=1` : item.url;

    return (
      <ListItemButton
        key={index}
        component={item.label === 'React MUI' ? RouterLink : 'a'}
        {...(item.label === 'React MUI' ? { to: finalUrl } : { href: finalUrl })}
        target={item.target}
      >
        <Tooltip title={item.tooltipTitle} placement="bottom">
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <ListItemAvatar
              sx={{
                minWidth: 'auto',
                marginRight: 1,
                filter: item.tooltipTitle === 'Live Preview Not Available' ? 'grayscale(1)' : ''
              }}
            >
              <CardMedia component="img" image={item.image} sx={{ width: '30px' }} />
            </ListItemAvatar>
            <ListItemText primary={item.label} />
          </Box>
        </Tooltip>
      </ListItemButton>
    );
  });

  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <ElevationScroll layout={layout} {...others}>
      <AppBar
        sx={(theme) => ({
          bgcolor: alpha(theme.palette.background.default, 0.1),
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
            <Stack
              direction="row"
              sx={{
                gap: 3,
                alignItems: 'center',
                display: { xs: 'none', md: 'flex' },
                '& .header-link': { fontWeight: 500, '&:hover': { color: 'primary.main' } }
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
                color="secondary.main"
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
                className="header-link"
                color="secondary.main"
                id="wallet-button"
                href="#"
                aria-controls={open ? 'wallet-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                onClick={handleClick}
                underline="none"
                sx={{ path: { strokeWidth: 2 }, svg: { marginBottom: '-3px' } }}
              >
                Live Preview {open ? <ArrowUp2 size="16" /> : <ArrowDown2 size="16" />}
              </Link>
              <Menu
                id="wallet-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                  'aria-labelledby': 'wallet-button',
                  sx: { p: 1.25, minWidth: 150 }
                }}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'right'
                }}
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right'
                }}
                sx={{ '.MuiModal-backdrop': { backgroundColor: 'unset' } }}
              >
                {listItems}
              </Menu>
              <Link href="https://github.com/phoenixcoded/able-pro-free-admin-dashboard-template" target="_blank" underline="none">
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
              <Box sx={{ display: 'inline-block' }}>
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
            </Stack>
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
                {layout !== 'component' && (
                  <Button
                    variant="outlined"
                    color="warning"
                    component={RouterLink}
                    to={ispValueAvailable ? '/components-overview/buttons?isp=1' : '/components-overview/buttons'}
                    sx={{ mt: 0.25 }}
                  >
                    All Components
                  </Button>
                )}

                <IconButton
                  size="large"
                  color="secondary"
                  {...(layout === 'component'
                    ? { onClick: () => handlerComponentDrawer(!menuMaster.isComponentDrawerOpened) }
                    : { onClick: drawerToggler(true) })}
                  sx={{ p: 1 }}
                >
                  <HambergerMenu />
                </IconButton>
              </Stack>
              <Drawer
                anchor="top"
                open={drawerToggle}
                onClose={drawerToggler(false)}
                sx={{ '& .MuiDrawer-paper': { backgroundImage: 'none' } }}
              >
                <Box
                  sx={{
                    width: 'auto',
                    '& .MuiListItemIcon-root': {
                      fontSize: '1rem',
                      minWidth: 32
                    }
                  }}
                  role="presentation"
                  onKeyDown={drawerToggler(false)}
                >
                  <List>
                    <Link
                      style={{ textDecoration: 'none' }}
                      component={RouterLink}
                      to={ispValueAvailable ? '/login?isp=1' : '/login'}
                      target="_blank"
                    >
                      <ListItemButton>
                        <ListItemIcon>
                          <Minus />
                        </ListItemIcon>
                        <ListItemText primary="Dashboard" slotProps={{ primary: { variant: 'h6', color: 'secondary.main' } }} />
                      </ListItemButton>
                    </Link>
                    <Link
                      style={{ textDecoration: 'none' }}
                      component={RouterLink}
                      to={ispValueAvailable ? '/components-overview/buttons?isp=1' : '/components-overview/buttons'}
                      target="_blank"
                    >
                      <ListItemButton>
                        <ListItemIcon>
                          <Minus />
                        </ListItemIcon>
                        <ListItemText primary="All Components" slotProps={{ primary: { variant: 'h6', color: 'secondary.main' } }} />
                      </ListItemButton>
                    </Link>
                    <Link
                      style={{ textDecoration: 'none' }}
                      href="https://github.com/phoenixcoded/able-pro-free-admin-dashboard-template"
                      target="_blank"
                    >
                      <ListItemButton>
                        <ListItemIcon>
                          <Minus />
                        </ListItemIcon>
                        <ListItemText primary="Free Version" slotProps={{ primary: { variant: 'h6', color: 'secondary.main' } }} />
                      </ListItemButton>
                    </Link>
                    <Link style={{ textDecoration: 'none' }} href="https://phoenixcoded.gitbook.io/able-pro" target="_blank">
                      <ListItemButton>
                        <ListItemIcon>
                          <Minus />
                        </ListItemIcon>
                        <ListItemText primary="Documentation" slotProps={{ primary: { variant: 'h6', color: 'secondary.main' } }} />
                      </ListItemButton>
                    </Link>
                    <Link style={{ textDecoration: 'none' }} href="https://phoenixcoded.authordesk.app/" target="_blank">
                      <ListItemButton>
                        <ListItemIcon>
                          <Minus />
                        </ListItemIcon>
                        <ListItemText primary="Support" slotProps={{ primary: { variant: 'h6', color: 'secondary.main' } }} />
                      </ListItemButton>
                    </Link>
                    <Link style={{ textDecoration: 'none' }} href={url} target="_blank">
                      <ListItemButton>
                        <ListItemIcon>
                          <Minus />
                        </ListItemIcon>
                        <ListItemText primary="Purchase Now" slotProps={{ primary: { variant: 'h6', color: 'secondary.main' } }} />
                        <Chip color="primary" label={import.meta.env.VITE_APP_VERSION} size="small" />
                      </ListItemButton>
                    </Link>
                    <Link style={{ textDecoration: 'none' }} href="#" onClick={() => setOpenDrawer(!openDrawer)}>
                      <ListItemButton>
                        <ListItemIcon>
                          <Minus />
                        </ListItemIcon>
                        <ListItemText primary="Live Preview" slotProps={{ primary: { variant: 'h6', color: 'secondary.main' } }} />
                        <Stack sx={{ path: { strokeWidth: 2 } }}>{openDrawer ? <ArrowUp2 size="16" /> : <ArrowDown2 size="16" />}</Stack>
                      </ListItemButton>
                    </Link>
                    <Collapse in={openDrawer} timeout="auto" unmountOnExit>
                      {openDrawer && <List sx={{ p: 0, pl: 6, '& .MuiListItemIcon-root': { minWidth: 20 } }}>{MobileMenuListItem}</List>}
                    </Collapse>
                  </List>
                </Box>
              </Drawer>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
    </ElevationScroll>
  );
}
