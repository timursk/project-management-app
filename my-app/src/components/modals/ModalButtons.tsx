import styled from '@emotion/styled';
import { Button } from '@mui/material';
import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { StyledModalButtonsWrapper } from './styles';

interface ModalButtonsProps {
  onConfirm: () => void;
  onDeny: () => void;
}

const ModalButtons: FC<ModalButtonsProps> = ({ onConfirm, onDeny }) => {
  const { t } = useTranslation();
  return (
    <StyledModalButtonsWrapper>
      <Button onClick={onDeny}>{t<string>('modal.deny')}</Button>
      <Button onClick={onConfirm} variant="contained">
        {t<string>('modal.confirm')}
      </Button>
    </StyledModalButtonsWrapper>
  );
};
export default ModalButtons;
