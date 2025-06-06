// material-ui
import CircularProgress, { CircularProgressProps, circularProgressClasses } from '@mui/material/CircularProgress';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

interface Props extends CircularProgressProps {
  showLabel?: boolean;
  pathColor?: string;
}

// ==============================|| PROGRESS - CIRCULAR PATH ||============================== //

export default function CircularWithPath({ value, size, variant, thickness, showLabel, pathColor, sx, ...others }: Props) {
  return (
    <Box sx={{ position: 'relative', display: 'inline-flex' }}>
      <CircularProgress
        variant="determinate"
        sx={{ color: pathColor ? pathColor : 'secondary.200' }}
        size={size}
        thickness={thickness}
        {...others}
        value={100}
      />
      {showLabel && (
        <Box
          sx={{
            top: 0,
            left: 0,
            bottom: 0,
            right: 0,
            position: 'absolute',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <Typography variant="caption" sx={{ color: 'text.secondary' }}>
            {value ? `${Math.round(value)}%` : '0%'}
          </Typography>
        </Box>
      )}
      <CircularProgress
        variant={variant}
        sx={{
          ...sx,
          position: 'absolute',
          left: 0,
          [`& .${circularProgressClasses.circle}`]: {
            strokeLinecap: 'round'
          }
        }}
        size={size}
        thickness={thickness}
        value={value}
        {...others}
      />
    </Box>
  );
}
