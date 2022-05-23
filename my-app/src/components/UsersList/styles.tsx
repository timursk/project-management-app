import styled from '@emotion/styled';
import { Box, Chip } from '@mui/material';

export const StyledBox = styled(Box)`
  position: absolute;
  top: 100%;
  right: 0;
  padding: 10px;
  min-width: 150px;
  width: auto;
  max-width: 200px;
  max-height: 150px;

  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  flex-wrap: nowrap;
  gap: 10px;

  z-index: 100;
  overflow: auto;
  background: #2c2c2c;
  border-radius: 2px;
  box-shadow: 0px 30px 60px rgb(32 56 85 / 15%);

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
