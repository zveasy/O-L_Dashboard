// material-ui
import { alpha, Theme } from '@mui/material/styles';
import Grid from '@mui/material/Grid2';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

// project-imports
import MainCard from 'components/MainCard';

// types
import { GenericCardProps } from 'types/root';

interface EcommerceMetrixProps extends GenericCardProps {}

// ==============================|| STATISTICS - REPORT CARD ||============================== //

export default function EcommerceMetrix({ primary, secondary, content, iconPrimary, color }: EcommerceMetrixProps) {
  const IconPrimary = iconPrimary!;
  const primaryIcon = iconPrimary ? <IconPrimary size={52} variant="Bulk" /> : null;

  const textColor = (theme: Theme) => (theme.palette.mode === 'dark' ? 'text.primary' : 'background.paper');

  return (
    <MainCard
      content={false}
      sx={(theme: Theme) => ({
        bgcolor: color || 'primary.main',
        position: 'relative',
        '&:before, &:after': {
          content: '""',
          width: 1,
          height: 1,
          position: 'absolute',
          background: `linear-gradient(90deg, ${alpha(theme.palette.background.paper, 0.0001)} 22.07%, ${alpha(theme.palette.background.paper, 0.15)} 83.21%)`,
          transform: 'matrix(0.9, 0.44, -0.44, 0.9, 0, 0)'
        },
        '&:after': { top: '50%', right: '-20px' },
        '&:before': { right: '-70px', bottom: '80%' }
      })}
    >
      <Box sx={{ px: 4.5, py: 4 }}>
        <Grid container justifyContent="space-between" alignItems="center">
          <Grid>
            <Box sx={{ color: textColor }}>{primaryIcon}</Box>
          </Grid>
          <Grid>
            <Stack sx={{ gap: 1, alignItems: 'flex-end' }}>
              <Typography variant="h5" sx={{ color: textColor, fontWeight: 500 }}>
                {primary}
              </Typography>
              <Typography variant="h3" sx={{ color: textColor }}>
                {secondary}
              </Typography>
            </Stack>
          </Grid>
        </Grid>
        <Stack direction="row" sx={{ gap: 1, justifyContent: 'flex-end', pt: 1.25 }}>
          <Typography variant="h5" sx={{ color: textColor, fontWeight: 400 }}>
            {content}
          </Typography>
        </Stack>
      </Box>
    </MainCard>
  );
}
