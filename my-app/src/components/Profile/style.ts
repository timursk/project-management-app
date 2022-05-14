import styled from '@emotion/styled';
import TextField from '@mui/material/TextField';

export const StyledForm = styled.form(() => ({
  display: 'flex',
  flexDirection: 'column',
  width: '80%',
  maxWidth: '300px',
  border: '2px solid #1769aa',
  borderRadius: '10px',
  margin: '20px auto',
}));
export const StyledField = styled(TextField)(() => ({
  margin: '0 10px',
  marginTop: '10px',
}));
