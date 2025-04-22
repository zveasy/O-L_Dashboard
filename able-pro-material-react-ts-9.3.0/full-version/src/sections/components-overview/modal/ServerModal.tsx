import { useRef } from 'react';

// material-ui
import Button from '@mui/material/Button';
import CardContent from '@mui/material/CardContent';
import Divider from '@mui/material/Divider';
import Modal from '@mui/material/Modal';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

// project-imports
import MainCard from 'components/MainCard';

// ==============================|| MODAL - SERVER ||============================== //

export default function ServerModal() {
  const rootRef = useRef<HTMLDivElement>(null);

  return (
    <MainCard content={false}>
      <Box
        sx={{
          height: 300,
          flexGrow: 1,
          minWidth: 300,
          transform: 'translateZ(0)',
          // The position fixed scoping doesn't work in IE11.
          // Disable this demo to preserve the others.
          '@media all and (-ms-high-contrast: none)': {
            display: 'none'
          }
        }}
        ref={rootRef}
      >
        <Modal
          disablePortal
          disableEnforceFocus
          disableAutoFocus
          open
          aria-labelledby="server-modal-title"
          aria-describedby="server-modal-description"
          sx={{ display: 'flex', p: 1, alignItems: 'center', justifyContent: 'center' }}
          container={() => rootRef.current}
        >
          <MainCard title="Server Side Modal" modal darkTitle content={false}>
            <CardContent>
              <Typography id="modal-modal-description">If you disable JavaScript, you will still see me.</Typography>
            </CardContent>
            <Divider />
            <Stack direction="row" sx={{ gap: 1, justifyContent: 'flex-end', px: 2.5, py: 2 }}>
              <Button color="error" size="small">
                Cancel
              </Button>
              <Button variant="contained" size="small">
                Submit
              </Button>
            </Stack>
          </MainCard>
        </Modal>
      </Box>
    </MainCard>
  );
}
