import { Button, TextField } from '@mui/material';
import { useFormik } from 'formik';
import React, { FC } from 'react';
import { useAppSelector } from '../../store/hooks';
import { StyledField, StyledForm } from './style';
import * as yup from 'yup';
import i18n from '../../localization/i18n';

const Profile: FC = () => {
  const { login, name } = useAppSelector((state) => state.userReducer);
  const validation = yup.object().shape({
    login: yup
      .string()
      .min(2, i18n.t('userForms.isShort', { field: i18n.t('userForms.login') }))
      .max(50, i18n.t('userForms.isLong', { field: i18n.t('userForms.login') }))
      .required(i18n.t('userForms.isRequired', { field: i18n.t('userForms.login') })),
    name: yup
      .string()
      .min(2, i18n.t('userForms.isShort', { field: i18n.t('userForms.login') }))
      .max(50, i18n.t('userForms.isLong', { field: i18n.t('userForms.login') }))
      .required(i18n.t('userForms.isRequired', { field: i18n.t('userForms.login') })),
  });
  const { handleBlur, handleChange, handleSubmit, handleReset, values, errors, isValid, touched } =
    useFormik({
      initialValues: {
        login: login || '',
        name: name || '',
      },
      onSubmit: (values) => {
        console.log(values);
      },
    });
  return (
    <StyledForm onSubmit={handleSubmit} onReset={handleReset}>
      <StyledField
        label={'name'}
        type={'text'}
        name="name"
        onBlur={handleBlur}
        onChange={handleChange}
        value={values.name}
      ></StyledField>
      <StyledField
        label={'login'}
        type={'text'}
        name="login"
        onBlur={handleBlur}
        onChange={handleChange}
        value={values.login}
      ></StyledField>
      <Button disabled={!isValid} variant="contained">
        Confirm
      </Button>
    </StyledForm>
  );
};

export default Profile;
