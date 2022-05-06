import { styled, Switch } from '@mui/material';
import { FC, useState } from 'react';
import engIcon from '../../assets/en.svg';
import ruIcon from '../../assets/ru.svg';
import { useTranslation } from 'react-i18next';

const LangSwitch = styled(Switch)(() => ({
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

const LanguageToggle: FC = () => {
  const { i18n } = useTranslation();

  const changeLanguage = () => i18n.changeLanguage(i18n.language === 'en' ? 'ru' : 'en');
  console.log(i18n.language);
  const handleChange = () => {
    changeLanguage();
  };
  return <LangSwitch checked={i18n.language === 'en'} onChange={handleChange} />;
};

export default LanguageToggle;
