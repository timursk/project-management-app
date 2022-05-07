import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';

const Welcom: FC = () => {
  const { t } = useTranslation();
  return <div>{t('welcome.header')}</div>;
};

export default Welcom;
