import styled from '@emotion/styled';
import { Alert, Box, Input, TextField } from '@mui/material';

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
export const StyledField = styled(TextField)({
  margin: '10px 0 0 0',
});

export const StyledAlert = styled(Alert)({
  margin: '5px 0 0 0',
  width: '92%',
});
