import Button from '@mui/material/Button';
import styled from '@emotion/styled';
import { Grid, TextField, Typography, Stack } from '@mui/material';
import { shadows, Box } from '@mui/system';

export const StyledColumnCard = styled(Grid)({
  // width: '300px',
  minWidth: '300px',
  padding: 15,
  backgroundColor: '#f5f5f5',
  borderRadius: '15px',
  margin: '0 10px',
  height: '100%',
});

export const StyledField = styled(TextField)({
  fontSize: '2rem',
});

export const StyledTitle = styled(Typography)({
  height: '4rem',
  padding: '0 14px',
  margin: '10px 0 ',
});

export const StyledBox = styled(Box)({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'flex-start',
});

export const StyledStack = styled(Stack)({
  height: '1000px',
  overflowY: 'auto',
});
