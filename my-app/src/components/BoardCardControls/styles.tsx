import styled from '@emotion/styled';
import { Box, Tooltip } from '@mui/material';

export const StyledBox = styled(Box)`
  position: absolute;
  top: 5px;
  right: 5px;
  transition: 0.2s;
`;

export const StyledColumn = styled.div`
  display: flex;
  flex-direction: column;
`;

export const StyledTooltip = styled(Tooltip)`
  marign-top: -10px;
`;
