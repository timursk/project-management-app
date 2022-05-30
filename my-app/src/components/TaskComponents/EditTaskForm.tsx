import { FC, useCallback } from 'react';
import { Button } from '@mui/material';
import { useFormik } from 'formik';
import { useTranslation } from 'react-i18next';
import StyledField from '../common/StyledField';
import StyledForm from '../common/StyledForm';
import Portal from '../Modals/Portal';
import { taskValidationSchema } from './validation-schema';
import CloseIcon from '@mui/icons-material/Close';
import tasksApi from '../../services/tasksService';
import { getToken } from '../../utils/utils';
import UserButton from './UserButton';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../store/hooks';
import { logoutUser } from '../../store/reducers/actionCreators';
import { ErrorObject } from '../../types/api/tasksApiTypes';
import { ColumnTask } from '../../types/store/storeTypes';
import { StyledOverlay, StyledModal, StyledModalCloseButton } from '../Modals/styles';
import ErrorMessage from '../ErrorMessge/ErrorMessage';

const OVERLAY_NAME = 'modal-overlay';

interface EditTaskFormProps {
  boardId: string;
  columnId: string;
  task: ColumnTask;
  onClose: () => void;
  refetch: () => void;
}
const EditTaskForm: FC<EditTaskFormProps> = ({ task, onClose, boardId, columnId, refetch }) => {
  const { t } = useTranslation();
  const token = getToken();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [updateTask, { error }] = tasksApi.useUpdateTaskMutation();

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
      title: task.title,
      description: task.description,
      userId: task.userId,
    },
    validationSchema: taskValidationSchema,
    onSubmit: async (values) => {
      await updateTask({
        boardId,
        columnId,
        token,
        id: task.id,
        order: task.order,
        title: values.title,
        description: values.description,
        userId: values.userId,
      });
      refetch();
      resetForm();
      if (!error) onClose();
    },
  });

  const handleClickOverlay = useCallback((e: React.MouseEvent<HTMLElement>) => {
    const dataValue = (e.target as HTMLElement).getAttribute('data-role');
    if (dataValue === OVERLAY_NAME) {
      onClose();
    }
  }, []);

  return (
    <>
      <Portal>
        {error && <ErrorMessage text={errorMessage()} />}
        <StyledOverlay data-role={OVERLAY_NAME} onClick={handleClickOverlay}>
          <StyledModal>
            <StyledModalCloseButton onClick={onClose}>
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
              <UserButton userId={values.userId} onSetUser={(id) => setFieldValue('userId', id)} />
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
    </>
  );
};

export default EditTaskForm;
