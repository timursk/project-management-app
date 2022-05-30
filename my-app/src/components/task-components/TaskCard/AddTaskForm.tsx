import { FC, useCallback, useEffect, useState } from 'react';
import { Alert, AlertTitle, Button } from '@mui/material';
import { useFormik } from 'formik';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import StyledField from '../../common/StyledField';
import StyledForm from '../../common/StyledForm';
import Portal from '../../Modals/Portal';
import StyledModal from '../../Modals/StyledModal';
import StyledModalCloseButton from '../../Modals/StyledModalCloseButton';
import StyledOverlay from '../../Modals/StyledOverlay';
import { taskValidationSchema } from './validation-schema';
import CloseIcon from '@mui/icons-material/Close';
import tasksApi from '../../../services/tasksService';
import { getToken } from '../../../utils/utils';
import UserButton from './UserButton';
import { logoutUser } from '../../../store/reducers/actionCreators';
import { ErrorObject } from '../../../types/api/tasksApiTypes';
import ErrorMessage from '../../ErrorMessge/ErrorMessage';

const OVERLAY_NAME = 'modal-overlay';

interface AddTaskFormProps {
  boardId: string;
  columnId: string;
  refetch: () => void;
}
const AddTaskForm: FC<AddTaskFormProps> = ({ boardId, columnId, refetch }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const token = getToken();

  const curUserId = useAppSelector((state) => state.userReducer.id);
  const [createTask, { error }] = tasksApi.useCreateTaskMutation();

  const [isModalShown, setIsModalShown] = useState<boolean>(false);
  const toggleModal = () => setIsModalShown((prevState) => !prevState);

  const errorMessage = () => {
    if (!error) return '';
    const {
      status,
      data: { message },
    } = error as ErrorObject;
    if (status === 404) {
      if (message === 'Column was not founded!') return t('errors.noColumn');
      if (message === 'Border was not founded!') return t('errors.noBorder');
      return t('errors.wrongPath');
    }
    if (status === 401) {
      dispatch(logoutUser());
      navigate('/welcome');
      return t('errors.tokenExpired');
    }
    return t('errors.unknownError');
  };

  const {
    errors,
    values,
    isValid,
    handleSubmit,
    handleReset,
    handleBlur,
    handleChange,
    touched,
    setFieldValue,
    resetForm,
  } = useFormik({
    initialValues: {
      title: '',
      description: '',
      userId: curUserId,
    },
    validationSchema: taskValidationSchema,
    onSubmit: async (values) => {
      await createTask({
        boardId,
        columnId,
        token,
        title: values.title,
        description: values.description,
        userId: values.userId,
      });
      refetch();
      resetForm();
      toggleModal();
    },
  });

  const handleClickOverlay = useCallback((e: React.MouseEvent<HTMLElement>) => {
    const dataValue = (e.target as HTMLElement).getAttribute('data-role');
    if (dataValue === OVERLAY_NAME) {
      toggleModal();
    }
  }, []);

  const handleEsc = (event: KeyboardEvent) => {
    if (event.key === 'Escape' && isModalShown) toggleModal();
  };

  useEffect(() => {
    document.addEventListener('keydown', handleEsc);

    return () => {
      document.removeEventListener('keydown', handleEsc);
    };
  }, []);

  return (
    <>
      {error && <ErrorMessage text={errorMessage()} />}
      <Button variant="text" type="button" onClick={toggleModal}>
        {t('task.addTask')}
      </Button>
      {isModalShown && (
        <Portal>
          <StyledOverlay data-role={OVERLAY_NAME} onClick={handleClickOverlay}>
            <StyledModal>
              <StyledModalCloseButton onClick={toggleModal}>
                <CloseIcon color="primary" aria-label={t('modal.closeModal')} />
              </StyledModalCloseButton>
              <StyledForm onSubmit={handleSubmit} onReset={handleReset}>
                <StyledField
                  error={errors.title && touched.title}
                  id="title"
                  name="title"
                  type="text"
                  onChange={handleChange}
                  value={values.title}
                  label={t('task.title')}
                  helperText={errors.title && touched.title ? errors.title : ''}
                  onBlur={handleBlur}
                />
                <StyledField
                  error={errors.description && touched.description}
                  id="description"
                  name="description"
                  type="text"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.description}
                  label={t('task.description')}
                  helperText={errors.description && touched.description ? errors.description : ''}
                />
                <UserButton userId={curUserId} onSetUser={(id) => setFieldValue('userId', id)} />
                <Button variant="text" type="reset">
                  {t('userForms.reset')}
                </Button>
                <Button variant="contained" type="submit" disabled={!isValid}>
                  {t('userForms.submit')}
                </Button>
              </StyledForm>
            </StyledModal>
          </StyledOverlay>
        </Portal>
      )}
    </>
  );
};

export default AddTaskForm;
