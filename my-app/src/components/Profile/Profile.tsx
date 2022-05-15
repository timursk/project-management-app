import { Alert, Button, TextField } from '@mui/material';
import { useFormik } from 'formik';
import React, { FC } from 'react';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { StyledButton, StyledField, StyledForm } from './style';
import * as yup from 'yup';
import i18n from '../../localization/i18n';
import { saveInfo } from '../../store/reducers/userSlice';
import { useUpdateUserMutation } from '../../services/userService';

const Profile: FC = () => {
  const { login, name, token, isLoading, error, userId } = useAppSelector(
    (state) => state.userReducer
  );
  const dispatch = useAppDispatch();
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
    },
    validationSchema: validation,
    onSubmit: (values) => {
      updateUser({
        userId: 'b9dffedf-c266-4b0b-807b-9dc4113dbba9',
        ...values,
        token,
        password: '11111111',
      }).then((data) => console.log(data));
      dispatch(saveInfo({ ...values, token, isLoading, error }));
      console.log(name, login);
    },
    onReset: () => {
      (values.name = ''), (values.login = '');
    },
  });
  return (
    <StyledForm onSubmit={handleSubmit} onReset={handleReset}>
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
      <StyledButton type="submit" disabled={!isValid && !dirty} variant="contained">
        Confirm
      </StyledButton>
    </StyledForm>
  );
};

export default Profile;
