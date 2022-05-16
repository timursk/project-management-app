import { Box } from '@mui/material';
import styled from '@emotion/styled';
import { border } from '@mui/system';

export const StyledBox = styled(Box)({
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  backgroundColor: 'background.paper',
  border: '2px solid #000',
  boxShadow: '24',
});
