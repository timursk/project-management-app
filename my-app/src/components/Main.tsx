import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';

const Main: FC = () => {
  const { t } = useTranslation();
  return <div>{t('main.header')}</div>;
};

export default Main;
