import { FC, useCallback, useEffect, useState } from 'react';
import { Button, Switch } from '@mui/material';
import { useFormik } from 'formik';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import StyledField from '../../common/StyledField';
import StyledForm from '../../common/StyledForm';
import Portal from '../../modals/Portal';
import StyledModal from '../../modals/StyledModal';
import StyledModalCloseButton from '../../modals/StyledModalCloseButton';
import StyledOverlay from '../../modals/StyledOverlay';
import { taskValidationSchema } from './validation-schema';
import CloseIcon from '@mui/icons-material/Close';
import tasksApi from '../../../services/tasksService';
import { getToken } from '../../../utils/utils';
import UserButton from './UserButton';
interface AddTaskFormProps {
  boardId: string;
  columnId: string;
}
const AddTaskForm: FC<AddTaskFormProps> = ({ boardId, columnId }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const token = getToken();

  const curUserId = useAppSelector((state) => state.userReducer.id);
  const [createTask, {}] = tasksApi.useCreateTaskMutation();

  const [isModalShown, setIsModalShown] = useState<boolean>(false);
  const toggleModal = () => setIsModalShown((prevState) => !prevState);

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
    onSubmit: (values) => {
      createTask({
        boardId,
        columnId,
        token,
        title: values.title,
        description: values.description,
        userId: values.userId,
      });
      resetForm();
      toggleModal();
    },
  });

  const handleClickOverlay = useCallback((e: React.MouseEvent<HTMLElement>) => {
    const dataValue = (e.target as HTMLElement).getAttribute('data-role');
    if (dataValue === 'modal-overlay') {
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
      <Button variant="text" type="button" onClick={toggleModal}>
        {t('task.addTask')}
      </Button>
      {isModalShown && (
        <Portal>
          <StyledOverlay data-role="modal-overlay" onClick={handleClickOverlay}>
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
