import { Button, Switch } from '@mui/material';
import { useFormik } from 'formik';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import * as yup from 'yup';
import { API_URL } from '../../constants';
import StyledField from './StyledField';
import StyledForm from './StyledForm';
import StyledPasswordSwitch from './StyledPasswordSwitch';

const RegistrationForm = () => {
  const { t } = useTranslation();
  const [isPasswordShown, setIsPasswordShown] = useState<boolean>(false);
  const { errors, values, isValid, handleSubmit, handleReset, handleBlur, handleChange, touched } =
    useFormik({
      initialValues: {
        login: '',
        name: '',

        // email: '',
        password: '',
        passwordConfirmation: '',
      },
      validationSchema: yup.object().shape({
        login: yup
          .string()
          .min(2, t('userForms.isShort', { field: t('userForms.login') }))
          .max(50, t('userForms.isLong', { field: t('userForms.login') }))
          .required(t('userForms.isRequired', { field: t('userForms.login') })),
        name: yup
          .string()
          .max(50, t('userForms.isLong', { field: t('userForms.name') }))
          .required(t('userForms.isRequired', { field: t('userForms.name') })),
        password: yup
          .string()
          .required(t('userForms.isRequired', { field: t('userForms.password') }))
          .min(6, t('userForms.isShort', { field: t('userForms.password') }))
          .matches(/[a-zA-Z0-9]/, t('userForms.passwordRequirements')),
        passwordConfirmation: yup
          .string()
          .required(t('userForms.isRequired', { field: t('userForms.passwordConfirmation') }))
          .oneOf([yup.ref('password'), null], t('userForms.matchPasswords')),
      }),
      onSubmit: (values) => {
        alert(JSON.stringify(values, null, 2));
        const { login, name, password } = values;
        fetch(`${API_URL}signup`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ login, name, password }, null, 2),
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
        error={errors.name && touched.name}
        id="name"
        name="name"
        type="text"
        onChange={handleChange}
        onBlur={handleBlur}
        value={values.name}
        label={t('userForms.name')}
        helperText={errors.name && touched.name ? errors.name : ''}
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

      <StyledField
        helperText={
          errors.passwordConfirmation && touched.passwordConfirmation
            ? errors.passwordConfirmation
            : ''
        }
        error={errors.passwordConfirmation && touched.passwordConfirmation}
        id="passwordConfirmation"
        name="passwordConfirmation"
        type={!isPasswordShown ? 'password' : 'text'}
        onChange={handleChange}
        onBlur={handleBlur}
        value={values.passwordConfirmation}
        label={t('userForms.passwordConfirmation')}
      />
      <StyledPasswordSwitch
        control={<Switch onChange={togglePasswordShown} checked={isPasswordShown} />}
        label={t('userForms.showPassword')}
      />
      <Button variant="text" type="reset">
        {t('userForms.reset')}
      </Button>
      <Button variant="contained" type="submit" disabled={!isValid}>
        {t('userForms.submit')}
      </Button>
    </StyledForm>
  );
};

export default RegistrationForm;
