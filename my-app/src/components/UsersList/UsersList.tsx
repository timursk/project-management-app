import { Tooltip, Zoom, IconButton, Badge, Chip, Avatar } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { Wrapper, StyledBox } from './styles';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { getToken } from '../../utils/utils';
import { getUsersService } from '../../services/getUsersService';

const UsersList = () => {
  const [users, setUsers] = useState<string[]>([]);
  const [isListShown, setIsListShown] = useState<boolean>(false);
  const token = getToken();

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
      <Tooltip title="Users" TransitionComponent={Zoom}>
        <IconButton onClick={handleClick}>
          <Badge badgeContent={users.length} color="primary">
            <AccountCircleIcon />
          </Badge>
        </IconButton>
      </Tooltip>

      {isListShown && (
        <StyledBox>
          {users.map((name, idx) => (
            <Chip key={idx} avatar={<Avatar>{name[0]}</Avatar>} label={name} />
          ))}
        </StyledBox>
      )}
    </Wrapper>
  );
};

export default UsersList;
