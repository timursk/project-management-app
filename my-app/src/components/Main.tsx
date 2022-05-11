import { Grid } from '@mui/material';
import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';
import boardsApi from '../services/boardsService';
import BoardCard from './BoardCard/BoardCard';
import Loader from './Loader/Loader';

const token =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiIxOTNiNjY4NS00OTA0LTRlNGMtYWM5MS00MGRjNjBhN2JlZTkiLCJsb2dpbiI6InRlc3QiLCJpYXQiOjE2NTIyMjU1NjZ9.eEI3wuImwtqcHoSWGP4jpvvR7SGqlmv3xYfGlGCMIxo';

const Main: FC = () => {
  const { t } = useTranslation();
  const { data, isError, isLoading } = boardsApi.useGetAllBoardsQuery({ token });

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
          data.map((board) => {
            const { id, title } = board;
            return (
              <Grid key={id} item xs={6} sm={6} md={4}>
                <BoardCard title={title} />
              </Grid>
            );
          })}
      </Grid>
    </>
  );
};

export default Main;
