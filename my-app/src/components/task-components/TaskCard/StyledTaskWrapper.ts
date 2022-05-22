import styled from '@emotion/styled';
import { Card } from '@mui/material';

const StyledTaskWrapper = styled(Card)(() => ({
  margin: '5px auto',
  width: '90%',
  maxWidth: '300px',
  maxHeight: '150px',
  padding: '10px',
  backgroundColor: '#f5f5f5',
  // ':hover': {
  //   maxHeight: 'initial',
  // },
}));

export default StyledTaskWrapper;
