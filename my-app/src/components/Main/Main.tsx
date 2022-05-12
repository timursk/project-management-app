import { Grid, IconButton, Tooltip, Typography, Zoom } from '@mui/material';
import React, { FC, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import boardsApi from '../../services/boardsService';
import BoardCard from '../BoardCard/BoardCard';
import Loader from '../Loader/Loader';
import { StyledGridItem, StyledGrid, StyledAddCircleIcon } from './styles';

const token =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiIxOTNiNjY4NS00OTA0LTRlNGMtYWM5MS00MGRjNjBhN2JlZTkiLCJsb2dpbiI6InRlc3QiLCJpYXQiOjE2NTIyNjg3NzF9.z3z283PgbUDkcblzNR-SZO01qW68dRPGWQxLy-X_ydQ';

const Main: FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const { data, isError, isLoading, error } = boardsApi.useGetAllBoardsQuery({ token });
  const [createBoard, {}] = boardsApi.useCreateBoardMutation();

  const handleAdd = () => {
    const title = prompt();
    createBoard({ token, title });
  };

  useEffect(() => {
    if (isError && error) {
      if ('status' in error && error.status === 401) {
        alert('Token has expired! Redirecting...');
        navigate('/Welcome');
      }
    }
  }, [error, isError, navigate]);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <>
      <Typography variant="h2">{`${t('main.header')} (${data?.length || 0})`}</Typography>
      <StyledGrid container spacing={4}>
        {data &&
          data.map(({ id, title }) => {
            return (
              <Grid key={id} item xs={12} sm={6} md={4}>
                <BoardCard id={id} title={title} />
              </Grid>
            );
          })}
        <StyledGridItem item xs={12} sm={6} md={4}>
          <Tooltip title={t('main.add')} placement="left" TransitionComponent={Zoom}>
            <IconButton onClick={handleAdd}>
              <StyledAddCircleIcon sx={{ width: 80, height: 80 }} />
            </IconButton>
          </Tooltip>
        </StyledGridItem>
      </StyledGrid>
    </>
  );
};

export default Main;
