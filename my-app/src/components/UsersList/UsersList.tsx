import { Tooltip, Zoom, IconButton, Badge, Chip, Avatar } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { Wrapper, StyledBox, StyledChip } from './styles';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { getToken } from '../../utils/utils';
import { getUsersService } from '../../services/getUsersService';
import { useTranslation } from 'react-i18next';

const UsersList = () => {
  const { t } = useTranslation();
  const token = getToken();

  const [users, setUsers] = useState<string[]>([]);
  const [isListShown, setIsListShown] = useState<boolean>(false);

  useEffect(() => {
    getUsersService(token).then((result) => {
      const names = result.map((item) => item.name);
      setUsers(names);
    });
  }, [token]);

  const handleClick = () => {
    setIsListShown(!isListShown);
  };

  return (
    <Wrapper>
      <Tooltip title={t('main.contributors')} TransitionComponent={Zoom} placement="top">
        <IconButton onClick={handleClick}>
          <Badge badgeContent={users.length} color="primary">
            <AccountCircleIcon />
          </Badge>
        </IconButton>
      </Tooltip>

      {isListShown && (
        <StyledBox>
          {users.map((name, idx) => (
            <StyledChip key={idx} avatar={<Avatar>{name[0].toUpperCase()}</Avatar>} label={name} />
          ))}
        </StyledBox>
      )}
    </Wrapper>
  );
};

export default UsersList;
