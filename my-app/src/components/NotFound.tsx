import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';
import ErrorScreen from './ErrorBoundary/ErrorScreen';
import { useNavigate } from 'react-router-dom';

const NotFound: FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <ErrorScreen
      text={t('notFound.header')}
      buttonText={t('notFound.goHome')}
      onTryAgain={() => navigate('/')}
    />
  );
};

export default NotFound;
