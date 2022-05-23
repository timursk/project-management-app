import styled from '@emotion/styled';
import { Box, Chip } from '@mui/material';

export const StyledBox = styled(Box)`
  position: absolute;
  top: 100%;
  right: 0;
  padding: 10px;
  max-width: 460px;
  min-width: 300px;
  width: auto;
  max-height: 150px;

  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  gap: 10px;

  z-index: 100;
  overflow: auto;
  background: #2c2c2c;
  border: 1px solid rgba(0, 0, 0, 0.08);
  border-radius: 8px;
  box-shadow: 0 8px 12px 0 rgb(0 0 0 / 16%);
  transition: 0.4s;

  &::-webkit-scrollbar {
    width: 10px;
    border: 1px solid;
  }

  &::-webkit-scrollbar-track {
    background: #2c2c2cc7;
  }

  &::-webkit-scrollbar-thumb {
    background-color: #616161; /* color of the scroll thumb */
    border-radius: 20px; /* roundness of the scroll thumb */
  }
`;

export const Wrapper = styled.div`
  position: relative;
  flex: 1 1;
  display: flex;
  align-items: center;
  justify-content: end;
`;

export const StyledChip = styled(Chip)`
  color: white;
`;
