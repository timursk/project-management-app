import styled from '@emotion/styled';
import { Grid, TextField, Typography } from '@mui/material';
import { Box } from '@mui/system';

export const StyledColumnCard = styled(Grid)({
  display: 'flex',
  flexDirection: 'column',
  position: 'relative',
  minWidth: '300px',
  maxWidth: '300px',
  padding: 15,
  backgroundColor: '#f5f5f5',
  borderRadius: '15px',
  margin: '0 10px',
  height: 'fit-content',
  maxHeight: '100%',
  ':hover': {
    boxShadow: '0px 0px 10px 8px rgba(34, 60, 80, 0.17)',
  },
  '::before': {
    content: '""',
    top: '0',
    left: '0',
    position: 'absolute',
    width: '100%',
    height: '80px',
    borderTopLeftRadius: '15px',
    borderTopRightRadius: '15px',
    background: '#bababa3d',
    pointerEvents: 'none',
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
