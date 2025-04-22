// material-ui
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Grid from '@mui/material/Grid2';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

// types
import { GenericCardProps } from 'types/root';

interface HoverSocialCardProps extends GenericCardProps {}

// ===========================|| STATISTICS - HOVER SOCIAL CARD ||=========================== //

export default function HoverSocialCard({ primary, secondary, iconPrimary, color }: HoverSocialCardProps) {
  const IconPrimary = iconPrimary!;
  const primaryIcon = iconPrimary ? <IconPrimary variant="Bold" size={52} /> : null;

  return (
    <Card
      elevation={0}
      sx={(theme) => ({
        bgcolor: color || 'primary.main',
        position: 'relative',
        color: 'background.paper',
        ...theme.applyStyles('dark', { color: 'text.primary' }),
        '&:hover svg': { opacity: 1, transform: 'scale(1.1)' }
      })}
    >
      <CardContent>
        <Box
          sx={(theme) => ({
            position: 'absolute',
            right: 15,
            top: 25,
            color: 'background.paper',
            ...theme.applyStyles('dark', { color: 'text.primary' }),
            '& svg': {
              opacity: 0.5,
              transition: 'all .3s ease-in-out'
            }
          })}
        >
          {primaryIcon}
        </Box>
        <Grid container spacing={0}>
          <Grid size={12}>
            <Typography variant="h3" color="inherit">
              {secondary}
            </Typography>
          </Grid>
          <Grid size={12}>
            <Typography color="inherit">{primary}</Typography>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}
