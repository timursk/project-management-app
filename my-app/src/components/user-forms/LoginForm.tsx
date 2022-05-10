import { Button, Switch } from '@mui/material';
import { useFormik } from 'formik';
import { FC, useState } from 'react';
import { useTranslation } from 'react-i18next';
import * as yup from 'yup';
import { API_URL } from '../../constants';
import StyledField from './StyledField';
import StyledForm from './StyledForm';
import StyledPasswordSwitch from './StyledPasswordSwitch';

const LoginForm: FC = () => {
  const { t } = useTranslation();
  const [isPasswordShown, setIsPasswordShown] = useState<boolean>(false);
  const { errors, values, isValid, handleSubmit, handleReset, handleBlur, handleChange, touched } =
    useFormik({
      initialValues: {
        login: '',
        password: '',
      },
      validationSchema: yup.object().shape({
        login: yup
          .string()
          .min(2, t('userForms.isShort', { field: t('userForms.login') }))
          .max(50, t('userForms.isLong', { field: t('userForms.login') }))
          .required(t('userForms.isRequired', { field: t('userForms.login') })),

        password: yup
          .string()
          .required(t('userForms.isRequired', { field: t('userForms.password') })),
      }),
      onSubmit: (values) => {
        alert(JSON.stringify(values, null, 2));
        fetch(`${API_URL}signin`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(values, null, 2),
        });
      },
    });

  const togglePasswordShown = () => setIsPasswordShown((prevState) => !prevState);

  return (
    <StyledForm onSubmit={handleSubmit} onReset={handleReset}>
      <StyledField
        error={errors.login && touched.login}
        id="login"
        name="login"
        type="text"
        onChange={handleChange}
        value={values.login}
        label={t('userForms.login')}
        helperText={errors.login && touched.login ? errors.login : ''}
        onBlur={handleBlur}
      />

      <StyledField
        helperText={errors.password && touched.password ? errors.password : ''}
        error={errors.password && touched.password}
        id="password"
        name="password"
        type={!isPasswordShown ? 'password' : 'text'}
        onChange={handleChange}
        onBlur={handleBlur}
        value={values.password}
        label={t('userForms.password')}
      />

      <StyledPasswordSwitch
        control={<Switch onChange={togglePasswordShown} checked={isPasswordShown} />}
        label={t('userForms.showPassword')}
      />
      <Button variant="text" type="reset">
        {t('userForms.reset')}
      </Button>
      <Button variant="contained" type="submit" disabled={!isValid}>
        {t('userForms.enter')}
      </Button>
    </StyledForm>
  );
};

export default LoginForm;
