import { FC, useCallback, useEffect, useState } from 'react';
import { Button, IconButton } from '@mui/material';
import { useFormik } from 'formik';
import { useTranslation } from 'react-i18next';
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

import EditIcon from '@mui/icons-material/Edit';
import { Task } from '../../../types/store/storeTypes';

interface EditTaskFormProps {
  task: Task;
  onClose: () => void;
}
const EditTaskForm: FC<EditTaskFormProps> = ({ task, onClose }) => {
  const { t } = useTranslation();
  const token = getToken();

  const [updateTask, {}] = tasksApi.useUpdateTaskMutation();

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
    onSubmit: (values) => {
      updateTask({
        boardId: task.boardId,
        columnId: task.columnId,
        token,
        id: task.id,
        order: task.order,
        title: values.title,
        description: values.description,
        userId: values.userId,
      });
      resetForm();
      onClose();
    },
  });

  const handleClickOverlay = useCallback((e: React.MouseEvent<HTMLElement>) => {
    const dataValue = (e.target as HTMLElement).getAttribute('data-role');
    if (dataValue === 'modal-overlay') {
      onClose();
    }
  }, []);

  return (
    <>
      <Portal>
        <StyledOverlay data-role="modal-overlay" onClick={handleClickOverlay}>
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