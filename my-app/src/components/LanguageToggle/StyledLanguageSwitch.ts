import { styled, Switch } from '@mui/material';
import engIcon from '../../assets/en.svg';
import ruIcon from '../../assets/ru.svg';

// MUI Switch (https://mui.com/material-ui/react-switch/#customization)
const StyledLanguageSwitch = styled(Switch)(() => ({
  width: 62,
  height: 34,
  padding: 7,

  '& .MuiSwitch-switchBase': {
    margin: 1,
    padding: 0,
    transform: 'translateX(6px)',

    '&.Mui-checked': {
      color: '#fff',
      transform: 'translateX(22px)',

      '& .MuiSwitch-thumb:before': {
        backgroundImage: `url(${engIcon})`,
      },

      '& + .MuiSwitch-track': { backgroundColor: '#808080' },
    },
  },

  '& .MuiSwitch-thumb': {
    width: 32,
    height: 32,

    '&:before': {
      content: "''",
      position: 'absolute',
      width: '32px',
      height: '32px',
      left: 0,
      top: 0,
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center',
      backgroundImage: `url(${ruIcon})`,
    },
  },

  '& .MuiSwitch-track': {
    backgroundColor: '#808080',
    borderRadius: 20 / 2,
  },
}));

export default StyledLanguageSwitch;
