import styled from '@emotion/styled';
import { Alert } from '@mui/material';
import theme from '../../theme';

const StyledAlert = styled(Alert)(() => ({
  position: 'fixed',
  top: '50px',
  margin: '0 auto',
}));

export default StyledAlert;
