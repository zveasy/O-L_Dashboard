// material-ui
import { Theme } from '@mui/material/styles';
import Grid from '@mui/material/Grid2';
import LinearProgress from '@mui/material/LinearProgress';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

// project-imports
import Avatar from 'components/@extended/Avatar';
import MainCard from 'components/MainCard';

// assets
import { Cloud } from 'iconsax-react';
import cardBack from 'assets/images/widget/img-dropbox-bg.svg';

// ===========================|| STATISTICS - DROPBOX ||=========================== //

export default function DropboxStorage() {
  return (
    <MainCard
      sx={(theme: Theme) => ({
        color: 'background.paper',
        bgcolor: 'secondary.800',
        ...theme.applyStyles('dark', { color: 'text.primary', bgcolor: 'secondary.100' }),
        '&:after': {
          content: '""',
          background: `url("${cardBack}") 100% / cover no-repeat`,
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: 1,
          opacity: 0.5
        }
      })}
    >
      <Grid container spacing={2}>
        <Grid size={12}>
          <Stack direction="row" sx={{ gap: 1, alignItems: 'center', justifyContent: 'space-between' }}>
            <Typography variant="h5">Dropbox Storage</Typography>
            <Typography variant="h4">150GB</Typography>
          </Stack>
          <Avatar color="secondary" variant="rounded" sx={{ mt: 0.75, bgcolor: 'secondary.dark', color: 'secondary.light' }}>
            <Cloud />
          </Avatar>
        </Grid>
        <Grid size={12}>
          <Stack sx={{ gap: 0.75 }}>
            <Typography variant="caption">1,342GB of 150GB Users</Typography>
            <Box sx={{ display: 'flex' }}>
              <LinearProgress variant="determinate" value={100} color="error" sx={{ width: '15%' }} />
              <LinearProgress variant="determinate" value={100} color="warning" sx={{ width: '18%', right: 2 }} />
              <LinearProgress variant="determinate" value={100} color="secondary" sx={{ width: '20%', right: 4 }} />
              <LinearProgress variant="determinate" value={100} color="success" sx={{ width: '28%', right: 8 }} />
            </Box>
          </Stack>
        </Grid>
      </Grid>
    </MainCard>
  );
}
