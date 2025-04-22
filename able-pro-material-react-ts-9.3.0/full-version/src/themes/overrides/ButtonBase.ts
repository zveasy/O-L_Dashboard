// material-ui
import { Theme } from '@mui/material/styles';

// ==============================|| OVERRIDES - BUTTON BASE ||============================== //

export default function ButtonBase(theme: Theme) {
  return {
    MuiButtonBase: {
      defaultProps: {
        disableRipple: false
      },
      styleOverrides: {
        root: {
          '&.MuiButtonBase-root:disabled': {
            cursor: 'default',
            pointerEvents: 'none',
            '&:hover': {
              borderColor: theme.palette.secondary.light,
              color: theme.palette.secondary.light
            },
            '&:focus-visible': {
              outline: 'none'
            },
            '&:after': {
              boxShadow: 'none'
            }
          }
        }
      }
    }
  };
}
