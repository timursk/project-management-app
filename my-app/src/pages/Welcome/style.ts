import { Button, Grid, Stack, TextField } from '@mui/material';
import styled from '@emotion/styled';

export const StyledImg = styled.img({
  maxWidth: '445px',
  width: '100%',
});
export const StyledGridItem = styled(Grid)({
  margin: 5,
});
export const StyledTextField = styled(TextField)({
  '& .MuiOutlinedInput-root': {
    height: '100%',
  },
});
export const StyledStack = styled(Stack)({
  height: '60px',
  maxWidth: '500px',
});
export const StyledButton = styled(Button)({
  width: '100%',
  maxWidth: '170px',
});
