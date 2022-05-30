import styled from '@emotion/styled';
import { Grid } from '@mui/material';

export const StyledImg = styled.img({
  height: 45,
  padding: '5px 0',
  filter: 'invert(98%) sepia(9%) saturate(281%) hue-rotate(112deg) brightness(114%) contrast(100%)',
  transition: '0.1s',
  ':hover': {
    filter: 'invert(60%) sepia(1%) saturate(0%) hue-rotate(115deg) brightness(91%) contrast(88%)',
  },
});

export const StyledGrid = styled(Grid)({
  alignItems: 'center',
  textAlign: 'center',
});
