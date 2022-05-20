import { Button, Switch } from '@mui/material';
import { useFormik } from 'formik';
import { useState, useMemo, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { deleteUser, updateUser } from '../../store/reducers/actionCreators';
import { getToken } from '../../utils/utils';
import ConfirmModal from '../modals/ConfirmModal';
import FormErrorMessage from './FormErrorMessage';
import StyledField from './StyledField';
import StyledForm from './StyledForm';
import StyledPasswordSwitch from './StyledPasswordSwitch';
import { registrationValidationSchema } from './validation-schemas';

const RegistrationForm = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const [isPasswordShown, setIsPasswordShown] = useState<boolean>(false);
  const [isModalShown, setIsModalShown] = useState<boolean>(false);
  const toggleModal = () => setIsModalShown((prevState) => !prevState);

  const { login, error, isLoading, name } = useAppSelector((state) => state.userReducer);
  const token = getToken();

  const { errors, values, isValid, handleSubmit, handleReset, handleBlur, handleChange, touched } =
    useFormik({
      initialValues: {
        login: login || '',
        name: name || '',
        password: '',
        passwordConfirmation: '',
      },
      validationSchema: registrationValidationSchema,
      onSubmit: (values) => {
        const { login, name, password } = values;
        dispatch(updateUser({ login, name, password, token }));
      },
    });

  const errorMessage = useMemo(() => {
    if (isLoading || !error) return '';
    if (error === 'Duplicate user') return t('userForms.duplicateUser');
    return t('userForms.unknownError');
  }, [error, isLoading, t]);

  const togglePasswordShown = () => setIsPasswordShown((prevState) => !prevState);

  // update is not available for unauthorized users
  useEffect(() => {
    if (!token) navigate('/login');
  }, [navigate, token]);

  const handleDeleteUser = () => dispatch(deleteUser(token));

  return (
    <>
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
        {!isLoading && error && <FormErrorMessage>{errorMessage}</FormErrorMessage>}

        <Button variant="text" color="warning" type="button" onClick={toggleModal}>
          {t('userForms.delete')}
        </Button>
        <Button variant="text" type="reset">
          {t('userForms.reset')}
        </Button>
        <Button variant="contained" type="submit" disabled={!isValid}>
          {t('userForms.submit')}
        </Button>
      </StyledForm>
      {isModalShown && (
        <ConfirmModal
          onConfirm={() => {
            handleDeleteUser();
            toggleModal();
          }}
          onClose={toggleModal}
          actionText={t('userForms.deleteConfirmation', { login })}
        />
      )}
    </>
  );
};

export default RegistrationForm;
