import { Grid } from '@mui/material';
import styled from '@emotion/styled';

export const StyledBox = styled.div(() => ({
  height: 'calc(84vh - 10px);',
  marginTop: '8vh',
}));

export const StyledGrid = styled(Grid)({
  width: '100%',
  height: '100%',
  margin: '0',
  padding: '15px 0',

  '@media (max-width: 970px)': {
    overflow: 'auto',
  },
});
