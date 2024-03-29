import { Portal, Typography } from '@mui/material';
import { FC, useCallback, useEffect } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import { useTranslation } from 'react-i18next';
import ModalButtons from './ModalButtons';
import { StyledOverlay, StyledModal, StyledModalCloseButton } from './styles';

const OVERLAY_NAME = 'modal-overlay';

interface ConfirmModalProps {
  onConfirm: () => void;
  onClose: () => void;
  actionText?: string;
  children?: React.ReactElement | React.ReactElement[];
}
const ConfirmModal: FC<ConfirmModalProps> = ({ onConfirm, onClose, actionText, children }) => {
  const { t } = useTranslation();

  const handleClickOverlay = useCallback((e: React.MouseEvent<HTMLElement>) => {
    const dataValue = (e.target as HTMLElement).getAttribute('data-role');
    if (dataValue === OVERLAY_NAME) {
      onClose();
    }
  }, []);

  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
    };

    document.addEventListener('keydown', handleEsc);

    return () => {
      document.removeEventListener('keydown', handleEsc);
    };
  }, []);

  return (
    <Portal>
      <StyledOverlay data-role={OVERLAY_NAME} onClick={handleClickOverlay}>
        <StyledModal>
          <StyledModalCloseButton onClick={onClose}>
            <CloseIcon color="primary" aria-label={t('modal.closeModal')} />
          </StyledModalCloseButton>
          <>
            <Typography variant="h6">{actionText}</Typography>
            {children ? children : null}
          </>

          <ModalButtons onConfirm={onConfirm} onDeny={onClose} />
        </StyledModal>
      </StyledOverlay>
    </Portal>
  );
};

export default ConfirmModal;
