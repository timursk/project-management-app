import styled from '@emotion/styled';
import theme from '../../theme';
import { IconButton } from '@mui/material';

export const StyledModalCloseButton = styled(IconButton)(
  () => `
  position: absolute;
  top: 10px;
  right: 10px;`
);

export const StyledOverlay = styled.main(
  () => `
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.7);

  display: flex;
  justify-content: center;
  align-items: center
`
);

export const StyledModalButtonsWrapper = styled.div(
  () => `
  display: flex;
  justify-content: flex-end;
  align-self: flex-end;

  margin-top: 20px;
`
);

export const StyledModal = styled.main(
  () => `
  position: relative;
  padding: 20px;

  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;

  width: 80%;
  max-width: 400px;

  background-color: #ffffff;
  border: 2px solid ${theme.palette.primary.main};
  border-radius: 10px;

`
);
