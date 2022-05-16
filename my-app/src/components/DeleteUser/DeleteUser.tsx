import { Button, Modal, Backdrop, Fade, Box, Typography } from '@mui/material';
import React, { FC } from 'react';
import { useDeleteUserMutation } from '../../services/userService';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { StyledBox } from './style';
import jwt_decode from 'jwt-decode';
import { logoutUser } from '../../store/reducers/actionCreators';

const DeleteUser: FC = () => {
  const dispatch = useAppDispatch();
  const { token } = useAppSelector((state) => state.userReducer);
  const [deleteUser, {}] = useDeleteUserMutation();
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleDeleteUser = () => {
    const { userId }: { userId: string } = jwt_decode(token);
    deleteUser({ userId, token });
    dispatch(logoutUser());
  };
  return (
    <div>
      <Button onClick={handleOpen}>Open modal</Button>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <StyledBox>
            <Typography id="transition-modal-title" variant="h6" component="h2">
              Text in a modal
            </Typography>
            <Typography id="transition-modal-description" sx={{ mt: 2 }}>
              Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
            </Typography>
            <Button variant="contained" onClick={handleDeleteUser}>
              Are you sure?
            </Button>
          </StyledBox>
        </Fade>
      </Modal>
    </div>
  );
};

export default DeleteUser;
