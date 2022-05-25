import styled from '@emotion/styled';
import { IconButton, InputBase, Typography } from '@mui/material';
import AccountCircle from '@mui/icons-material/AccountCircle';
import SearchIcon from '@mui/icons-material/Search';

export const StyledDivContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 50px;
  padding: 12px 32px 12px 24px;
  margin: 15px 0;
  border: 1px solid #dbdbdb;
  border-radius: 8px;
  box-shadow: 0px 30px 60px rgba(32, 56, 85, 0.15);
  @media (max-width: 600px) {
    padding: 6px 8px 6px 6px;
  }
`;

export const StyledHeaderTypography = styled(Typography)`
  margin-right: 40px;
  flex: 2 1;
  @media (max-width: 600px) {
    margin-right: 10px;
  }
`;

export const StyledDivRelative = styled.div`
  position: relative;
  width: 100%;
  flex: 7 1;
`;

export const StyledInputBase = styled(InputBase)`
  margin-left: 1px;
  flex: 1;
  background: #f4f7fc;
  border-radius: 200px;
  width: 100%;
  padding-left: 40px;
  padding-right: 30px;
`;

export const StyledIconButton = styled(IconButton)`
  position: absolute;
  top: 50%;
  right: -5px;
  transform: translateY(-50%);
`;

export const StyledAccountCircle = styled(AccountCircle)`
  width: 40px;
  height: 40px;
`;

export const StyledSearchIcon = styled(SearchIcon)`
  position: absolute;
  top: 50%;
  left: 10px;
  transform: translateY(-50%);
`;
