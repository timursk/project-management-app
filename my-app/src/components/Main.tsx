import { Grid, IconButton, Tooltip, Zoom } from '@mui/material';
import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';
import boardsApi from '../services/boardsService';
import BoardCard from './BoardCard/BoardCard';
import Loader from './Loader/Loader';
import AddCircleIcon from '@mui/icons-material/AddCircle';

const token =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiIxOTNiNjY4NS00OTA0LTRlNGMtYWM5MS00MGRjNjBhN2JlZTkiLCJsb2dpbiI6InRlc3QiLCJpYXQiOjE2NTIyNjg3NzF9.z3z283PgbUDkcblzNR-SZO01qW68dRPGWQxLy-X_ydQ';

const Main: FC = () => {
  const { t } = useTranslation();
  const { data, isError, isLoading } = boardsApi.useGetAllBoardsQuery({ token });
  const [createBoard, {}] = boardsApi.useCreateBoardMutation();

  if (isLoading) {
    return <Loader />;
  }

  if (isError) {
    return <p>ERROR</p>;
  }

  return (
    <>
      <div>{t('main.header')}</div>
      <div>Boards: </div>
      <Grid container spacing={4} justifyContent="center" justifyItems="center">
        {data &&
          data.map(({ id, title }) => {
            return (
              <Grid key={id} item xs={6} sm={6} md={4}>
                <BoardCard id={id} title={title} />
              </Grid>
            );
          })}
        <Grid
          item
          xs={6}
          sm={6}
          md={4}
          sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
        >
          <Tooltip title="Add board" placement="left" TransitionComponent={Zoom}>
            <IconButton
              onClick={() => {
                const title = prompt();
                createBoard({ token, title });
              }}
            >
              <AddCircleIcon sx={{ width: 80, height: 80 }} />
            </IconButton>
          </Tooltip>
        </Grid>
      </Grid>
    </>
  );
};

export default Main;
