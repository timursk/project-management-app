import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';
import DeleteUser from './DeleteUser/DeleteUser';

const Main: FC = () => {
  const { t } = useTranslation();
  return <div>{t('main.header')}</div>;
};

export default Main;
