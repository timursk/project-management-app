import { Button } from '@mui/material';
import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';
import StyledLanguageSwitch from '../LanguageToggle/StyledLanguageSwitch';
import ErrorScreenWrapper from './ErrorScreenWrapper';

interface ErrorScreenProps {
  onTryAgain: () => void;
}

const ErrorScreen: FC<ErrorScreenProps> = ({ onTryAgain }) => {
  const { t } = useTranslation();

  return (
    <ErrorScreenWrapper>
      <h1>{t('error.text')}</h1>
      <Button type="button" onClick={onTryAgain}>
        {t('error.button')}
      </Button>
    </ErrorScreenWrapper>
  );
};

export default ErrorScreen;
