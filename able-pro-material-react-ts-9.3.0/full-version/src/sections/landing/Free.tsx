import { Link as RouterLink } from 'react-router-dom';

// material-ui
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid2';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

// project-imports
import FadeInWhenVisible from './Animation';
import { useIspValue } from 'hooks/useIspValue';

// assets
import { ExportSquare } from 'iconsax-react';

// ==============================|| LANDING - FREE PAGE ||============================== //

export default function FreePage() {
  const ispValueAvailable = useIspValue();

  return (
    <Container>
      <Grid container spacing={3} sx={{ alignItems: 'center', justifyContent: 'center', mt: { md: 10, xs: 2.5 }, mb: { md: 10, xs: 2.5 } }}>
        <Grid size={{ xs: 12, md: 8 }}>
          <FadeInWhenVisible>
            <Grid container spacing={2} sx={{ justifyContent: 'center', paddingTop: 3 }}>
              <Grid size={12}>
                <Typography variant="h2">
                  <Box
                    component="span"
                    sx={{
                      color: 'primary.main'
                    }}
                  >
                    TRY{' '}
                  </Box>
                  BEFORE BUY
                </Typography>
              </Grid>
              <Grid size={12}>
                <Typography>Download the Free MIT Able Pro Dashboard Template before make your purchase decision.</Typography>
              </Grid>
            </Grid>
          </FadeInWhenVisible>
        </Grid>
        <Grid size={{ xs: 12, md: 4 }}>
          <FadeInWhenVisible>
            <Grid container spacing={2} sx={{ justifyContent: 'end', alignItems: 'center', paddingTop: 3 }}>
              <Grid>
                <Button
                  variant="outlined"
                  color="secondary"
                  size="large"
                  component={RouterLink}
                  to={ispValueAvailable ? '/login?isp=1' : '/login'}
                  target="_blank"
                >
                  Check out Pro Version
                </Button>
              </Grid>
              <Grid>
                <Button
                  variant="contained"
                  color="primary"
                  size="large"
                  startIcon={<ExportSquare />}
                  component={Link}
                  href="https://github.com/phoenixcoded/able-pro-free-admin-dashboard-template"
                  target="_blank"
                >
                  Free Version
                </Button>
              </Grid>
            </Grid>
          </FadeInWhenVisible>
        </Grid>
      </Grid>
    </Container>
  );
}
