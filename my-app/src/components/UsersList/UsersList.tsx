import { Tooltip, Zoom, IconButton, Badge, Avatar } from '@mui/material';
import React, { MouseEvent, useEffect, useRef, useState } from 'react';
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
  const [activeId, setActiveId] = useState(0);
  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    getUsersService(token).then((result) => {
      const names = result.map((item) => item.name);
      setUsers(names);
    });
  }, [token]);

  useEffect(() => {
    const onKeydown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowDown') {
        setActiveId((prev) => (prev === users.length - 1 ? prev : ++prev));
      } else if (e.key === 'ArrowUp') {
        setActiveId((prev) => (prev === 0 ? prev : --prev));
      } else if (e.key === 'Escape') {
        setIsListShown(false);
      }
    };

    const handleClickOutside = (e: Event) => {
      if (listRef.current && !listRef.current.contains(e.target as HTMLElement)) {
        setIsListShown(false);
      }
    };

    if (isListShown) {
      document.addEventListener('keydown', onKeydown);
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('keydown', onKeydown);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isListShown, users]);

  useEffect(() => {
    //scroll to active elem on arrowUp/arrowDown
    listRef?.current?.children[activeId].scrollIntoView({ block: 'center', inline: 'center' });
  }, [activeId]);

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
        <StyledBox ref={listRef}>
          {users.map((name, idx) => (
            <StyledChip
              key={idx}
              variant={idx === activeId ? 'outlined' : null}
              onClick={() => setActiveId(idx)}
              avatar={<Avatar>{name[0].toUpperCase()}</Avatar>}
              label={name}
            />
          ))}
        </StyledBox>
      )}
    </Wrapper>
  );
};

export default UsersList;
