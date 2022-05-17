import React, { ChangeEvent, Dispatch, SetStateAction } from 'react';
import { IconButton } from '@mui/material';
import { t } from 'i18next';
import {
  StyledAccountCircle,
  StyledDivContainer,
  StyledHeaderTypography,
  StyledIconButton,
  StyledInputBase,
  StyledLeftItem,
  StyledDivRelative,
  StyledRightItem,
  StyledSearchIcon,
} from './styles';

import ClearIcon from '@mui/icons-material/Clear';

type Props = {
  value: string;
  setValue: Dispatch<SetStateAction<string>>;
};

const MainControls = ({ value, setValue }: Props) => {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setValue(value);
  };

  const handleDelete = () => {
    setValue('');
  };

  return (
    <StyledDivContainer>
      <StyledLeftItem>
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
      </StyledLeftItem>

      <StyledRightItem>
        <IconButton size="large" onClick={() => {}}>
          <StyledAccountCircle />
        </IconButton>
      </StyledRightItem>
    </StyledDivContainer>
  );
};

export default MainControls;
