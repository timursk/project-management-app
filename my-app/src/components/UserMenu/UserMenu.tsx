import * as React from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { useTranslation } from 'react-i18next';
import PersonIcon from '@mui/icons-material/Person';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import LogoutIcon from '@mui/icons-material/Logout';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { ListItemIcon } from '@mui/material';
import { logoutUser } from '../../store/reducers/actionCreators';

const UserMenu = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();

  const login = useAppSelector((state) => state.userReducer.login);

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  // TODO add delete and settings options
  const goToEdit = () => alert('Edit user profile');

  const handleLogout = () => {
    // TODO add modal confirmation
    dispatch(logoutUser());
  };

  const handleDelete = () => alert('Delete user');

  return (
    <div>
      <Button
        id="basic-button"
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
        startIcon={<PersonIcon />}
        variant="contained"
      >
        {login}
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <MenuItem onClick={goToEdit}>
          <ListItemIcon>
            <EditIcon />
          </ListItemIcon>
          {t('userMenu.edit')}
        </MenuItem>
        <MenuItem onClick={handleLogout}>
          <ListItemIcon>
            <LogoutIcon />
          </ListItemIcon>
          {t('userMenu.logout')}
        </MenuItem>
        <MenuItem onClick={handleDelete}>
          <ListItemIcon>
            {' '}
            <DeleteIcon />
          </ListItemIcon>
          {t('userMenu.delete')}
        </MenuItem>
      </Menu>
    </div>
  );
};

export default UserMenu;
