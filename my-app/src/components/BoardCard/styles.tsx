import styled from '@emotion/styled';
import { Box, Card, Typography } from '@mui/material';

export const StyledCard = styled(Card)`
  position: relative;
  min-width: 140px;
  max-width: 400px;
  min-height: 80px;
  background-color: #f5f5f5;
  overflow: initial;
`;

export const StyledTypography = styled(Typography)`
  height: 80px;
  padding-right: 20px;
  color: text.secondary;
  font-size: 1.5rem;
  word-wrap: break-word;
`;

export const StyledEditBox = styled(Box)`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: white;
  border-radius: 4px;
  z-index: 10;
`;

// position: fixed;
//   top: 0;
//   left: 0;
//   width: 100vw;
//   height: 100vh;
//   background: #0009;
//   color: #fff;
//   z-index: 10;
