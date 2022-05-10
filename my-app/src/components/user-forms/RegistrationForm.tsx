import { Button, FormControlLabel, styled, Switch } from '@mui/material';
import { useFormik } from 'formik';
import { useState } from 'react';
import * as yup from 'yup';
import StyledField from './StyledField';
import StyledForm from './StyledForm';

const CentredSwitchLabel = styled(FormControlLabel)(() => ({ alignSelf: 'center' }));

const RegistrationForm = () => {
  const [isPasswordShown, setIsPasswordShown] = useState<boolean>();
  const { errors, values, isValid, handleSubmit, handleReset, handleBlur, handleChange, touched } =
    useFormik({
      initialValues: {
        login: '',
        email: '',
        password: '',
        passwordConfirmation: '',
      },
      validationSchema: yup.object().shape({
        login: yup.string().min(2, 'Too Short!').max(50, 'Too Long!').required('Required'),
        email: yup.string().email('Invalid email').required('Required'),
        password: yup
          .string()
          .required('Password is required')
          .min(6, 'Password is too short (6 chars minimum)')
          .matches(/[a-zA-Z0-9]/, 'Password can only contain Latin letters and numbers.'),
        passwordConfirmation: yup
          .string()
          .required('Confirmation is required')
          .oneOf([yup.ref('password'), null], 'Passwords must match'),
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
        label="Login"
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
        label="Email"
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
        label="Password"
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
        label="Password confirmation"
      />
      <CentredSwitchLabel
        control={<Switch onChange={togglePasswordShown} defaultChecked={isPasswordShown} />}
        label="Show passwords"
      />
      <Button variant="text" type="reset">
        Reset
      </Button>
      <Button variant="contained" type="submit" disabled={!isValid}>
        Submit
      </Button>
    </StyledForm>
  );
};

export default RegistrationForm;
