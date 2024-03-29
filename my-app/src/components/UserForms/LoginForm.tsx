import { Button, Switch } from '@mui/material';
import { useFormik } from 'formik';
import { FC, useState, useMemo, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { loginUser } from '../../store/reducers/actionCreators';
import { resetInfo, resetLoading, saveInfo } from '../../store/reducers/userSlice';
import { getToken } from '../../utils/utils';
import StyledField from '../common/StyledField';
import StyledForm from '../common/StyledForm';
import { CentredSwitchLabel, FormErrorMessage } from './styles';
import { loginValidationSchema } from './validation-schemas';
import LoadingButton from '@mui/lab/LoadingButton';

const LoginForm: FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const login = useAppSelector((state) => state.userReducer.login);
  const error = useAppSelector((state) => state.userReducer.error);
  const isLoading = useAppSelector((state) => state.userReducer.isLoading);
  const token = getToken();

  const [isPasswordShown, setIsPasswordShown] = useState<boolean>(false);

  const { errors, values, isValid, handleSubmit, handleReset, handleBlur, handleChange, touched } =
    useFormik({
      initialValues: {
        login: login || '',
        password: '',
      },
      validationSchema: loginValidationSchema,
      onSubmit: (values) => {
        dispatch(saveInfo({ login: values.login, name: '' }));
        dispatch(loginUser(values));
      },
      onReset: () => {
        dispatch(resetInfo());
      },
    });

  const togglePasswordShown = () => setIsPasswordShown((prevState) => !prevState);

  const errorMessage = useMemo(() => {
    if (isLoading || !error) return '';
    if (error === 'Invalid user or password') return t('userForms.invalidLoginOrPassword');
    if (error === 'User not found')
      return (
        <>
          <span>{t('userForms.userNotFound')}</span>
          <Link to={'/registration'}>{t('userForms.createUser')}</Link>
        </>
      );
    return t('userForms.unknownError');
  }, [error, isLoading, t]);

  const handleQuestLogin = () => {
    const guest = {
      login: 'guest',
      password: 'guest1234',
    };
    dispatch(saveInfo({ login: guest.login, name: '' }));
    dispatch(loginUser(guest));
  };

  useEffect(() => {
    dispatch(resetLoading());
    if (token) navigate('/');
  }, [navigate, token]);

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

      <CentredSwitchLabel
        control={<Switch onChange={togglePasswordShown} checked={isPasswordShown} />}
        label={t('userForms.showPassword')}
      />
      {!isLoading && error && <FormErrorMessage>{errorMessage}</FormErrorMessage>}
      <Button variant="text" type="reset">
        {t('userForms.reset')}
      </Button>
      <LoadingButton loading={isLoading} variant="contained" type="submit" disabled={!isValid}>
        {t('userForms.enter')}
      </LoadingButton>
      <Button variant="text" color="info" onClick={handleQuestLogin}>
        {t('userForms.guestLogin')}
      </Button>
    </StyledForm>
  );
};

export default LoginForm;
