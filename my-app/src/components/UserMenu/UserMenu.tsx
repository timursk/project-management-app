import { FC, useState } from 'react';
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
import { deleteUser, logoutUser } from '../../store/reducers/actionCreators';
import { useNavigate } from 'react-router-dom';
import ConfirmModal from '../modals/ConfirmModal';
import { getToken } from '../../utils/utils';

const UserMenu: FC = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { login } = useAppSelector((state) => state.userReducer);
  const token = getToken();

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const openMenu = Boolean(anchorEl);

  const [isModalDeleteShown, setIsModalDeleteShown] = useState<boolean>(false);
  const toggleModalDelete = () => setIsModalDeleteShown((prevState) => !prevState);

  const [isModalLogoutShown, setIsModalLogoutShown] = useState<boolean>(false);
  const toggleLogoutModal = () => setIsModalLogoutShown((prevState) => !prevState);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const goToEdit = () => {
    handleClose();
    navigate('/profile');
  };

  const handleClickLogout = () => {
    handleClose();
    toggleLogoutModal();
  };

  const handleClickDelete = () => {
    handleClose();
    toggleModalDelete();
  };

  const handleLogout = () => {
    toggleLogoutModal();
    dispatch(logoutUser());
  };

  const handleDeleteUser = () => {
    toggleModalDelete();
    dispatch(deleteUser(token));
  };

  return (
    <div>
      <Button
        id="basic-button"
        aria-controls={openMenu ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={openMenu ? 'true' : undefined}
        onClick={handleClick}
        startIcon={<PersonIcon />}
        variant="contained"
      >
        {login}
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={openMenu}
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
        <MenuItem onClick={handleClickLogout}>
          <ListItemIcon>
            <LogoutIcon />
          </ListItemIcon>
          {t('userMenu.logout')}
        </MenuItem>
        <MenuItem onClick={handleClickDelete}>
          <ListItemIcon>
            <DeleteIcon />
          </ListItemIcon>
          {t('userMenu.delete')}
        </MenuItem>
      </Menu>
      {isModalDeleteShown && (
        <ConfirmModal
          onConfirm={handleDeleteUser}
          onClose={toggleModalDelete}
          actionText={t('userForms.deleteConfirmation', { login })}
        />
      )}
      {isModalLogoutShown && (
        <ConfirmModal
          onConfirm={handleLogout}
          onClose={toggleLogoutModal}
          actionText={t('userForms.logoutConfirmation', { login })}
        />
      )}
    </div>
  );
};

export default UserMenu;
