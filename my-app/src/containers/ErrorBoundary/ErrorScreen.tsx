import { Button } from '@mui/material';
import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { string } from 'yup';
import StyledLanguageSwitch from '../../components/LanguageToggle/StyledLanguageSwitch';
import ErrorScreenWrapper from './ErrorScreenWrapper';

interface ErrorScreenProps {
  onTryAgain: () => void;
  text?: string;
  buttonText?: string;
}

const ErrorScreen: FC<ErrorScreenProps> = ({ onTryAgain, text, buttonText }) => {
  const { t } = useTranslation();

  return (
    <ErrorScreenWrapper>
      <h1>{text || t('error.text')}</h1>
      <Button type="button" onClick={onTryAgain}>
        {buttonText || t('error.button')}
      </Button>
    </ErrorScreenWrapper>
  );
};

export default ErrorScreen;
