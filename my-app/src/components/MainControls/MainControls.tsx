import React, { ChangeEvent, Dispatch, SetStateAction, useState } from 'react';
import { t } from 'i18next';
import {
  StyledDivContainer,
  StyledHeaderTypography,
  StyledIconButton,
  StyledInputBase,
  StyledDivRelative,
  StyledSearchIcon,
} from './styles';

import ClearIcon from '@mui/icons-material/Clear';
import { IconButton, Tooltip, Zoom, Avatar, Chip, Badge, Box } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import styled from '@emotion/styled';

type Props = {
  value: string;
  setValue: Dispatch<SetStateAction<string>>;
};

const StyledBox = styled(Box)`
  position: absolute;
  top: 100%;
  right: 0;
  width: 200px;
  z-index: 100;
  flex-wrap: wrap;
  background: lightgrey;
  gap: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  max-height: 150px;
  overflow: auto;
  padding: 5px;
`;

const Wrapper = styled.div`
  position: relative;
`;

const MainControls = ({ value, setValue }: Props) => {
  const [isListShown, setIsListShown] = useState<boolean>(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setValue(value);
  };

  const handleDelete = () => {
    setValue('');
  };

  const handleClick = () => {
    setIsListShown(!isListShown);
  };

  return (
    <StyledDivContainer>
      <StyledHeaderTypography variant="h6">{`${t('main.header')}`}</StyledHeaderTypography>

      <StyledDivRelative>
        <StyledInputBase value={value} onChange={handleChange} placeholder={t('main.search')} />

        <StyledSearchIcon />

        {value && (
          <StyledIconButton onClick={handleDelete} disableRipple={true}>
            <ClearIcon />
          </StyledIconButton>
        )}
      </StyledDivRelative>

      <Wrapper>
        <Tooltip title="Users" TransitionComponent={Zoom}>
          <IconButton onClick={handleClick}>
            <Badge badgeContent={4} color="primary">
              <AccountCircleIcon />
            </Badge>
          </IconButton>
        </Tooltip>

        {isListShown && (
          <StyledBox>
            <Chip avatar={<Avatar>M</Avatar>} label="Avatar" />
          </StyledBox>
        )}
      </Wrapper>
    </StyledDivContainer>
  );
};

export default MainControls;
