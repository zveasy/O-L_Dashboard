// material-ui
import FormControlLabel from '@mui/material/FormControlLabel';
import Radio from '@mui/material/Radio';
import Tooltip from '@mui/material/Tooltip';
import Box from '@mui/material/Box';

// project-imports
import Avatar from 'components/@extended/Avatar';

// assets
import { TickSquare } from 'iconsax-react';

interface Props {
  color: string;
  value: string;
  isLight?: boolean;
}

// ==============================|| CALENDAR - COLOR PALETTE ||============================== //

export default function ColorPalette({ color, value, isLight }: Props) {
  return (
    <Tooltip title={color}>
      <FormControlLabel
        value={value}
        label=""
        control={
          <Radio
            icon={
              <Avatar variant="rounded" type="combined" size="xs" sx={{ bgcolor: color, borderColor: 'divider' }}>
                <Box sx={{ display: 'none' }} />
              </Avatar>
            }
            checkedIcon={
              <Avatar
                variant="rounded"
                type="combined"
                size="xs"
                sx={(theme) => ({
                  bgcolor: color,
                  color: isLight ? 'secondary.dark' : 'secondary.lighter',
                  ...theme.applyStyles('dark', {
                    color: 'secondary.lighter'
                  }),
                  borderColor: 'divider',
                  '& svg': { width: 20, height: 20 }
                })}
              >
                <TickSquare variant="Bold" />
              </Avatar>
            }
            sx={{ '&:hover': { bgcolor: 'transparent' } }}
          />
        }
      />
    </Tooltip>
  );
}
