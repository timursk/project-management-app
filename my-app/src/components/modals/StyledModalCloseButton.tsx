import styled from '@emotion/styled';
import { IconButton } from '@mui/material';

const StyledModalCloseButton = styled(IconButton)(
  () => `
  position: absolute;
  top: 10px;
  right: 10px;`
);

export default StyledModalCloseButton;
