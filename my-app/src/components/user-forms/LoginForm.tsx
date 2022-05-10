import { Button, FormControlLabel, styled, Switch } from '@mui/material';
import { useFormik } from 'formik';
import { FC, useState } from 'react';
import * as yup from 'yup';
import StyledField from './StyledField';
import StyledForm from './StyledForm';
import StyledPasswordSwitch from './StyledPasswordSwitch';

const LoginForm: FC = () => {
  const [isPasswordShown, setIsPasswordShown] = useState<boolean>(false);
  const { errors, values, isValid, handleSubmit, handleReset, handleBlur, handleChange, touched } =
    useFormik({
      initialValues: {
        login: '',
        password: '',
      },
      validationSchema: yup.object().shape({
        login: yup.string().min(2, 'Too Short!').max(50, 'Too Long!').required('Required'),
        password: yup.string().required('Password is required'),
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

      <StyledPasswordSwitch
        control={<Switch onChange={togglePasswordShown} checked={isPasswordShown} />}
        label="Show passwords"
      />
      <Button variant="text" type="reset">
        Reset
      </Button>
      <Button variant="contained" type="submit" disabled={!isValid}>
        Login
      </Button>
    </StyledForm>
  );
};

export default LoginForm;
