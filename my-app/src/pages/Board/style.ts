import { Container, Grid } from '@mui/material';
import { Box } from '@mui/system';
import styled from '@emotion/styled';

export const StyledBox = styled.div(() => ({
  minHeight: '90vh',
  overflowX: 'auto',
}));

export const StyledGrid = styled(Grid)({
  width: '320px',
});
