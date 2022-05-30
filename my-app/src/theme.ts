import { createTheme, ThemeOptions } from '@mui/material/styles';

const themeOptions: ThemeOptions = {
  palette: {
    primary: {
      main: '#2c2c2c',
    },
    secondary: {
      main: '#F4F7FC',
    },
  },
};

const theme = createTheme(themeOptions);

export default theme;
