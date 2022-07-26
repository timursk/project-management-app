import styled from '@emotion/styled';
import { Box, Container } from '@mui/material';

export const StyledBox = styled(Box)`
  min-height: 100vh;
  font-size: 24px;
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: auto 1fr auto;
`;

export const StyledContainer = styled(Container)`
  display: flex;
  flex-direction: column;
  width: 100vw;
`;
