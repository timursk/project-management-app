import { Alert } from '@mui/material';
import { useFormik } from 'formik';
import React, { ChangeEvent, Dispatch, FormEvent, SetStateAction, useState } from 'react';
import boardsApi from '../../services/boardsService';
import ConfirmModal from '../modals/ConfirmModal';
import { StyledEditBox, StyledInput, StyledInputBox } from './styles';
import * as yup from 'yup';
import { useTranslation } from 'react-i18next';
import { getToken } from '../../utils/utils';

type Props = {
  id?: string;
  title?: string;
  description?: string;
  setIsEdit: Dispatch<SetStateAction<boolean>>;
  type: string;
};

const BoardEdit = ({ id, title, setIsEdit, description, type }: Props) => {
  const [updateBoard, {}] = boardsApi.useUpdateBoardMutation();
  const [createBoard, {}] = boardsApi.useCreateBoardMutation();

  const token = getToken();

  const { t } = useTranslation();

  const validation = yup.object().shape({
    title: yup.string().min(2, 'Min 2').max(40, 'Max 40').required('This field necessarily'),
    description: yup.string().min(2, 'Min 2').max(40, 'Max 40').required('This field necessarily'),
  });

  const { handleBlur, handleChange, handleSubmit, errors, values } = useFormik({
    initialValues: {
      title: title || '',
      description: description || '',
    },
    validationSchema: validation,
    onSubmit: ({ title, description }) => {
      if (type === 'create') {
        createBoard({ token, title, description });
        setIsEdit(false);
      }
      if (type === 'update') {
        updateBoard({ id, token, title, description });
        setIsEdit(false);
      }
    },
  });

  const handleClose = () => {
    setIsEdit(false);
  };

  return (
    <>
      <ConfirmModal
        onClose={handleClose}
        onConfirm={handleSubmit}
        actionText={(type === 'create' && t('main.add')) || (type === 'update' && t('main.edit'))}
      >
        <StyledInput
          name="title"
          autoFocus
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder={title || 'title'}
          type="text"
          value={values.title}
        />
        {errors.title && <Alert severity="error">{errors.title}</Alert>}
        <StyledInput
          name="description"
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder={description || 'description'}
          type="text"
          value={values.description}
        />
        {errors.description && <Alert severity="error">{errors.description}</Alert>}
      </ConfirmModal>
    </>
  );
};

export default BoardEdit;
