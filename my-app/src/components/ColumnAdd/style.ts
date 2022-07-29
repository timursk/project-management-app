import { Button } from '@mui/material';
import styled from '@emotion/styled';

export const StyledAddButton = styled(Button)({
  height: 70,
  minWidth: 300,
  width: '10%',
  backgroundColor: '#f5f5f5',
  borderRadius: '15px',
  color: 'black',
  ':hover': {
    color: 'white',
  },
});
