import { createTheme, ThemeOptions } from '@mui/material/styles';

const themeOptions: ThemeOptions = {
  palette: {
    primary: {
      main: '#006EE9',
    },
    secondary: {
      main: '#F4F7FC',
    },
  },
};

const theme = createTheme(themeOptions);

export default theme;
