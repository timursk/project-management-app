import { Button, Switch } from '@mui/material';
import { useFormik } from 'formik';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import * as yup from 'yup';
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
        email: '',
        password: '',
        passwordConfirmation: '',
      },
      validationSchema: yup.object().shape({
        login: yup
          .string()
          .min(2, t('userForms.isShort', { field: t('userForms.login') }))
          .max(50, t('userForms.isLong', { field: t('userForms.login') }))
          .required(t('userForms.isRequired', { field: t('userForms.login') })),
        email: yup
          .string()
          .email(t('userForms.isInvalid', { field: t('userForms.email') }))
          .required(t('userForms.isRequired', { field: t('userForms.email') })),
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
        error={errors.email && touched.email}
        id="email"
        name="email"
        type="email"
        onChange={handleChange}
        onBlur={handleBlur}
        value={values.email}
        label={t('userForms.email')}
        helperText={errors.email && touched.email ? errors.email : ''}
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
