import { FC, useState, useCallback, useEffect } from 'react';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import PersonIcon from '@mui/icons-material/Person';
import { ListItemIcon, Typography } from '@mui/material';
import usersApi from '../../../services/usersService';
import Loader from '../../Loader/Loader';
import { getToken } from '../../../utils/utils';
import StyledCentredButton from './StyledCentredButton';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { useNavigate } from 'react-router-dom';
import { logoutUser } from '../../../store/reducers/actionCreators';
import { ErrorObject } from '../../../types/api/tasksApiTypes';
import ErrorMessage from '../../ErrorMessge/ErrorMessage';
import { ListItemIcon } from '@mui/material';
import { StyledCentredButton } from './styles';
import usersApi from '../../services/usersService';
import { getToken } from '../../utils/utils';
import Loader from '../Loader/Loader';

interface UserButtonProps {
  userId: string;
  onSetUser: (userId: string) => void;
}

const UserButton: FC<UserButtonProps> = ({ userId, onSetUser }) => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { login, name } = useAppSelector((state) => state.userReducer);

  const [isNoUser, setIsNoUser] = useState<boolean>(false);
  const [selectedId, setSelectedId] = useState<string>(userId);
  const [selectedId, setSelectedId] = useState(userId);
  const token = getToken();

  const {
    currentData: user,
    error,
    refetch,
  } = usersApi.useGetUserByIdQuery({
    token,
    userId: selectedId || userId || '',
  });

  if (error) {
    const { status } = error as ErrorObject;
    if (status === 401) {
      dispatch(logoutUser());
      navigate('/welcome');
    }
    if (status === 400 && !isNoUser) {
      setIsNoUser(true);
    }
  }

  const { currentData: allUsers, refetch: refetchAll } = usersApi.useGetAllUsersQuery({ token });
  useEffect(() => {
    refetch();
    refetchAll();
  }, [login, name, refetch]);

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  useEffect(() => {
    if (token) setSelectedId(userId);
  }, [token, userId]);

  const handleSelectId = useCallback(
    (id: string) => {
      setSelectedId(id);
      onSetUser(id);
      handleClose();
    },
    [onSetUser]
  );

  return (
    <>
      {isNoUser && !selectedId && <ErrorMessage text={t('errors.cardWithoutUser')} />}
      <StyledCentredButton
        id="basic-button"
        aria-controls={open ? 'change-user-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
        startIcon={<PersonIcon />}
        variant="outlined"
      >
        <Typography noWrap> {user && user.login}</Typography>
      </StyledCentredButton>

      <Menu
        id="change-user-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        {allUsers ? (
          allUsers.map(({ login, id }) => (
            <MenuItem key={id} onClick={() => handleSelectId(id)}>
              <ListItemIcon>
                <PersonIcon />
              </ListItemIcon>
              {login}
            </MenuItem>
          ))
        ) : (
          <Loader />
        )}
      </Menu>
    </>
  );
};

export default UserButton;
