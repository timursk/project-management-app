import styled from '@emotion/styled';
import { Box } from '@mui/material';

export const StyledBox = styled(Box)`
  position: absolute;
  top: 100%;
  right: 0;
  padding: 10px;
  width: auto;
  max-width: 200px;
  max-height: 150px;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  flex-wrap: nowrap;
  gap: 10px;

  z-index: 100;
  overflow: auto;
  background: lightgrey;
`;

export const Wrapper = styled.div`
  position: relative;
`;
