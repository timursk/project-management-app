import { Container, styled } from '@mui/material';

const ErrorScreenWrapper = styled(Container)(() => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  flexGrow: 1,
  position: 'absolute',
  top: '50%',
  transform: 'translateY(-50%)',
}));

export default ErrorScreenWrapper;
