import { Portal } from '@mui/material';
import { FC } from 'react';
import ModalButtons from './ModalButtons';
import StyledModal from './StyledModal';
import StyledOverlay from './StyledOverlay';

interface ConfirmModalProps {
  onConfirm: () => void;
  onClose: () => void;
  actionText: string;
}
const ConfirmModal: FC<ConfirmModalProps> = ({ onConfirm, onClose, actionText }) => {
  return (
    <Portal>
      <StyledOverlay>
        <StyledModal>
          <h3>Confirm action?</h3>
          <span>{actionText}</span>
          <ModalButtons onConfirm={onConfirm} onDeny={onClose} />
        </StyledModal>
      </StyledOverlay>
    </Portal>
  );
};

export default ConfirmModal;
