import {
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  Typography,
} from '@mui/material';
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

  return (
    <>
      <div>{t('main.header')}</div>
      <div>Boards: </div>
      <ul>
        {data &&
          data.map((board) => {
            const { id, title } = board;
            return (
              <li key={board.id}>
                <BoardCard title={title} />
              </li>
            );
          })}
      </ul>
    </>
  );
};

export default Main;
