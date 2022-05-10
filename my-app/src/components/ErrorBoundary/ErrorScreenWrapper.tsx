import { Container, styled } from '@mui/material';

const ErrorScreenWrapper = styled(Container)(() => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  flexGrow: 1,
}));

export default ErrorScreenWrapper;
