// material-ui
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

// project-imports
import AcquisitionChart from './AcquisitionChart';
import Avatar from 'components/@extended/Avatar';
import MainCard from 'components/MainCard';

// assets
import { Chainlink, DocumentText } from 'iconsax-react';

// avatar style
const avatarSX = { width: 36, height: 36, fontSize: '1rem' };

// action style
const actionSX = {
  mt: 0.75,
  ml: 1,
  top: 'auto',
  right: 'auto',
  alignSelf: 'flex-start',
  transform: 'none'
};

// ==============================|| ANALYTICS - ACQUISITION CHANNELS ||============================== //

export default function AcquisitionChannels() {
  return (
    <MainCard content={false}>
      <Stack>
        <List sx={{ p: 0, '& .MuiListItemButton-root': { pt: 2, pb: 0 } }}>
          <ListItemButton sx={{ '&:hover': { bgcolor: 'transparent' }, cursor: 'text' }}>
            <ListItemText
              primary={<Typography variant="subtitle1">Acquisition Channels</Typography>}
              secondary={<Typography>Marketing</Typography>}
            />
            <Typography variant="h5" color="primary">
              -128
            </Typography>
          </ListItemButton>
        </List>
        <Box sx={{ pr: 2 }}>
          <AcquisitionChart />
        </Box>

        <List
          component="nav"
          sx={{
            p: 0,
            '& .MuiListItemButton-root': {
              py: 1.5,
              px: 2,
              borderRadius: 0,
              '& .MuiAvatar-root': avatarSX,
              '& .MuiListItemSecondaryAction-root': { ...actionSX, position: 'relative' }
            }
          }}
        >
          <ListItem
            component={ListItemButton}
            secondaryAction={
              <Stack sx={{ alignItems: 'flex-end' }}>
                <Typography variant="subtitle1">+ $1,430</Typography>
                <Typography noWrap sx={{ color: 'text.secondary' }}>
                  35%
                </Typography>
              </Stack>
            }
            divider
          >
            <ListItemAvatar>
              <Avatar color="secondary" sx={{ bgcolor: 'secondary.200' }}>
                <Chainlink />
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary={<Typography variant="subtitle1">Top Channels</Typography>} secondary="Today, 2:00 AM" />
          </ListItem>
          <ListItem
            component={ListItemButton}
            secondaryAction={
              <Stack sx={{ alignItems: 'flex-end' }}>
                <Typography variant="subtitle1" noWrap>
                  - $1430
                </Typography>
                <Typography noWrap sx={{ color: 'text.secondary' }}>
                  35%
                </Typography>
              </Stack>
            }
          >
            <ListItemAvatar>
              <Avatar>
                <DocumentText />
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary={<Typography variant="subtitle1">Top Pages</Typography>} secondary="Today 6:00 AM" />
          </ListItem>
        </List>
      </Stack>
    </MainCard>
  );
}
