import styled from '@emotion/styled';
import { Button } from '@mui/material';

const StyledCentredButton = styled(Button)(() => ({
  margin: '10px auto',
  overflow: 'hidden',
  maxWidth: '100%',
  justifyContent: 'start',
}));

export default StyledCentredButton;
