import { createTheme, responsiveFontSizes } from '@mui/material';
import { TypographyOptions } from '@mui/material/styles/createTypography';

const typography: TypographyOptions = {
  fontSize: 16,
  fontFamily: 'Space Grotesk',
} as const;

const light = responsiveFontSizes(
  createTheme({
    typography,
  }),
);

const dark = responsiveFontSizes(
  createTheme({
    typography,
    palette: {
      primary: {
        main: '#5f67cb',
      },
      secondary: {
        main: '#ffc54b',
      },
      background: {
        default: '#2d2d2d',
        paper: '#424242',
      },
      text: {
        primary: '#ffffff',
        secondary: '#d8d8d8',
        disabled: 'rgba(206,206,206,0.5)',
      },
      warning: {
        main: '#fffc00',
      },
    },
  }),
);

export default {
  dark,
  light,
} as const;
