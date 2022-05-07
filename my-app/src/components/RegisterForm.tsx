import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';

const RegisterForm: FC = () => {
  const { t } = useTranslation();
  return <div>{t('registrationForm.header')}</div>;
};

export default RegisterForm;
