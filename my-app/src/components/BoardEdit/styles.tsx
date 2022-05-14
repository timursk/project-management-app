import styled from '@emotion/styled';
import { Box, Input } from '@mui/material';

export const StyledEditBox = styled(Box)`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: white;
  border-radius: 4px;
  z-index: 10;
`;

export const StyledInputBox = styled(Box)`
  height: 100%;
`;

export const StyledInput = styled(Input)`
  width: 100%;
  height: 100%;
  padding: 20px;
`;
