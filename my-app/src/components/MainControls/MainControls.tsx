import React, { ChangeEvent, Dispatch, SetStateAction } from 'react';
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
import UsersList from '../UsersList/UsersList';

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

      <UsersList />
    </StyledDivContainer>
  );
};

export default MainControls;
