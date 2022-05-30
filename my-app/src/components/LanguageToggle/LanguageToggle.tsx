import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import StyledLanguageSwitch from './StyledLanguageSwitch';

const LanguageToggle: FC = () => {
  const { i18n } = useTranslation();

  const changeLanguage = () => i18n.changeLanguage(i18n.language === 'en' ? 'ru' : 'en');

  const handleChange = () => {
    changeLanguage();
  };

  return <StyledLanguageSwitch checked={i18n.language === 'en'} onChange={handleChange} />;
};

export default LanguageToggle;
