import styled from '@emotion/styled';
import { Button } from '@mui/material';
import { FC } from 'react';

const StyledModalButtonsWrapper = styled.div(
  () => `
  display: flex;
  justify-content: flex-end;
  align-self: flex-end;

  margin-top: 20px;
`
);

interface ModalButtonsProps {
  onConfirm: () => void;
  onDeny: () => void;
}

const ModalButtons: FC<ModalButtonsProps> = ({ onConfirm, onDeny }) => (
  <StyledModalButtonsWrapper>
    <Button onClick={onDeny}>Deny</Button>
    <Button onClick={onConfirm} variant="contained">
      Confirm
    </Button>
  </StyledModalButtonsWrapper>
);
export default ModalButtons;
