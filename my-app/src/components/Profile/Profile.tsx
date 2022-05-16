import { Alert, Typography } from '@mui/material';
import { useFormik } from 'formik';
import React, { FC } from 'react';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { StyledButton, StyledField, StyledForm } from './style';
import * as yup from 'yup';
import i18n from '../../localization/i18n';

import { useUpdateUserMutation } from '../../services/userService';
import jwt_decode from 'jwt-decode';
import { saveInfo } from '../../store/reducers/userSlice';

const Profile: FC = () => {
  const dispatch = useAppDispatch();
  const { token, name, login } = useAppSelector((state) => state.userReducer);
  const [updateUser, { isSuccess }] = useUpdateUserMutation();
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
    password: yup
      .string()
      .required(i18n.t('userForms.isRequired', { field: i18n.t('userForms.password') })),
  });
  const {
    handleBlur,
    handleChange,
    handleSubmit,
    handleReset,
    values,
    errors,
    isValid,
    touched,
    dirty,
  } = useFormik({
    initialValues: {
      login: login || '',
      name: name || '',
      password: '',
    },
    validationSchema: validation,
    onSubmit: async ({ password, name, login }) => {
      const { userId }: { userId: string } = await jwt_decode(token);
      updateUser({ userId, password, name, login, token });
      dispatch(saveInfo({ name, login }));
    },
    onReset: () => {
      (values.name = ''), (values.login = ''), (values.password = '');
    },
  });

  return (
    <div>
      <StyledForm onSubmit={handleSubmit} onReset={handleReset}>
        <Typography sx={{ margin: '0 auto' }} variant={'h5'} component={'div'}>
          Edit your profile
        </Typography>
        <StyledField
          id="name"
          label={'name'}
          type={'text'}
          name="name"
          onBlur={handleBlur}
          onChange={handleChange}
          value={values.name}
        ></StyledField>
        {touched.name && errors.name && <Alert severity="error">{errors.name}</Alert>}
        <StyledField
          id="login"
          label={'login'}
          type={'text'}
          name="login"
          onBlur={handleBlur}
          onChange={handleChange}
          value={values.login}
        ></StyledField>
        {touched.login && errors.login && <Alert severity="error">{errors.login}</Alert>}
        <StyledField
          id="password"
          label={'password'}
          type={'password'}
          name="password"
          onBlur={handleBlur}
          onChange={handleChange}
          value={values.password}
        ></StyledField>
        {touched.login && errors.login && <Alert severity="error">{errors.login}</Alert>}
        <StyledButton type="submit" disabled={!isValid && !dirty} variant="contained">
          Confirm
        </StyledButton>
      </StyledForm>
    </div>
  );
};

export default Profile;
