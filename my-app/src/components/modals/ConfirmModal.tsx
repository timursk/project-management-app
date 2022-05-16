import { Portal } from '@mui/material';
import { FC, useCallback, useEffect } from 'react';
import ModalButtons from './ModalButtons';
import StyledModal from './StyledModal';
import StyledModalCloseButton from './StyledModalCloseButton';
import StyledOverlay from './StyledOverlay';
import CloseIcon from '@mui/icons-material/Close';
import { useTranslation } from 'react-i18next';

interface ConfirmModalProps {
  onConfirm: () => void;
  onClose: () => void;
  actionText: string;
}
const ConfirmModal: FC<ConfirmModalProps> = ({ onConfirm, onClose, actionText }) => {
  const { t } = useTranslation();

  const handleClickOverlay = useCallback((e: React.MouseEvent<HTMLElement>) => {
    const dataValue = (e.target as HTMLElement).getAttribute('data-role');
    if (dataValue === 'modal-overlay') {
      onClose();
    }
  }, []);

  const handleEsc = (event: KeyboardEvent) => {
    if (event.key === 'Escape') onClose();
  };

  useEffect(() => {
    document.addEventListener('keydown', handleEsc);

    return () => {
      document.removeEventListener('keydown', handleEsc);
    };
  }, []);

  return (
    <Portal>
      <StyledOverlay data-role="modal-overlay" onClick={handleClickOverlay}>
        <StyledModal>
          <StyledModalCloseButton onClick={onClose}>
            <CloseIcon color="primary" aria-label={t('modal.closeModal')} />
          </StyledModalCloseButton>
          <h3>{t<string>('modal.confirmHeader')}</h3>
          <span>{actionText}</span>
          <ModalButtons onConfirm={onConfirm} onDeny={onClose} />
        </StyledModal>
      </StyledOverlay>
    </Portal>
  );
};

export default ConfirmModal;
