import { FormControl, Grid, TextField } from '@mui/material';
import styled from '@emotion/styled';

export const StyledImg = styled.img({
  maxWidth: '445px',
  height: '550px',
});
export const StyledGridItem = styled(Grid)({
  margin: 5,
});
export const StyledTextField = styled(TextField)({
  marginRight: 3,
  width: '80%',
});
export const StyledForm = styled(FormControl)({
  flexDirection: 'row',
  width: '80%',
});
