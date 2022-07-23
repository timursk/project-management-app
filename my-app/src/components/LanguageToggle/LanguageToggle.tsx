import MenuItem from '@mui/material/MenuItem';
import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import StyledSelect from './StyledSelect';

const LanguageToggle: FC = () => {
  const { i18n } = useTranslation();

  const changeLanguage = () => i18n.changeLanguage(i18n.language === 'en' ? 'ru' : 'en');

  const handleChange = () => {
    changeLanguage();
  };

  return (
    <StyledSelect value={i18n.language} onChange={handleChange} displayEmpty>
      <MenuItem value="en">EN</MenuItem>
      <MenuItem value="ru">RU</MenuItem>
    </StyledSelect>
  );
};

export default LanguageToggle;
