import { FC, useState } from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { useTranslation } from 'react-i18next';
import PersonIcon from '@mui/icons-material/Person';
import { ListItemIcon } from '@mui/material';
import usersApi from '../../../services/usersService';
import Loader from '../../Loader/Loader';

interface UserButtonProps {
  userId: string;
  onSetUser: (userId: string) => void;
}

const UserButton: FC<UserButtonProps> = ({ userId, onSetUser }) => {
  const { t } = useTranslation();

  const token = window.localStorage.getItem('PMA-token'); // TODO replace with getToken
  const user = usersApi.useGetUserByIdQuery({ token, userId });

  const allUsers = usersApi.useGetAllUsersQuery({ token });

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <Button
        id="basic-button"
        aria-controls={open ? 'change-user-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
        startIcon={<PersonIcon />}
        variant="outlined"
      >
        {user && user.currentData && user.currentData.login}
      </Button>

      <Menu
        id="change-user-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        {allUsers && allUsers.currentData ? (
          allUsers.currentData.map(({ login, id }) => (
            <MenuItem key={id} onClick={() => onSetUser(id)}>
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
    </div>
  );
};

export default UserButton;
