import styled from '@emotion/styled';
import { Grid, TextField, Typography, Stack } from '@mui/material';
import { Box } from '@mui/system';

export const StyledColumnCard = styled(Grid)({
  minWidth: '300px',
  padding: 15,
  backgroundColor: '#f5f5f5',
  borderRadius: '15px',
  margin: '0 10px',
  height: '100%',
  ':hover': {
    boxShadow: '0px 0px 10px 8px rgba(34, 60, 80, 0.17)',
  },
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
  height: 'min-content',
  maxHeight: '1000px',
  overflowY: 'auto',
});
