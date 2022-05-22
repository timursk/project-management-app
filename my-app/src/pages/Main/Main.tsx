import { IconButton, Tooltip, Zoom } from '@mui/material';
import React, { FC, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import boardsApi from '../../services/boardsService';
import BoardCard from '../../components/BoardCard/BoardCard';
import Loader from '../../components/Loader/Loader';
import { StyledGridItem, StyledGrid, StyledAddCircleIcon } from './styles';
import MainControls from '../../components/MainControls/MainControls';
import { filterByTitle, getToken, sleep } from '../../utils/utils';
import TaskCard from '../../components/task-components/TaskCard/TaskCard';
import AddTaskForm from '../../components/task-components/TaskCard/AddTaskForm/AddTaskForm';

const token =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiIxOTNiNjY4NS00OTA0LTRlNGMtYWM5MS00MGRjNjBhN2JlZTkiLCJsb2dpbiI6InRlc3QiLCJpYXQiOjE2NTIyNjg3NzF9.z3z283PgbUDkcblzNR-SZO01qW68dRPGWQxLy-X_ydQ';

const Main: FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const token = getToken();
  const { data: boardsData, isError, isLoading, error } = boardsApi.useGetAllBoardsQuery({ token });
  const [createBoard, {}] = boardsApi.useCreateBoardMutation();

  const [boards, setBoards] = useState(boardsData);
  const [value, setValue] = useState('');

  useEffect(() => {
    if (isError && 'status' in error && error.status === 401) {
      alert('Token has expired! Redirecting...');

      sleep(3000).then(() => {
        navigate('/welcome');
      });
    }
  }, [error, isError, navigate]);

  useEffect(() => {
    setBoards(boardsData);
  }, [boardsData]);

  useEffect(() => {
    if (!value) {
      setBoards(boardsData);
      return;
    }

    const filteredBoards = filterByTitle(boardsData, value);

    setBoards(filteredBoards);
  }, [value, setValue, boardsData]);

  const handleAdd = () => {
    let title = prompt();
    while (title && title.length > 40) {
      alert('MAX 40 symbols');
      title = prompt();
    }
    createBoard({ token, title });
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <>
      <MainControls value={value} setValue={setValue} />

      <StyledGrid container spacing={4}>
        {boards &&
          boards.map(({ id, title }) => {
            return <BoardCard key={id} id={id} title={title} />;
          })}

        <StyledGridItem item xs={12} sm={6} md={4}>
          <Tooltip title={t('main.add')} placement="left" TransitionComponent={Zoom}>
            <IconButton onClick={handleAdd}>
              <StyledAddCircleIcon />
            </IconButton>
          </Tooltip>
        </StyledGridItem>
      </StyledGrid>

      <TaskCard taskId={''} />
      <AddTaskForm
        boardId={'9b63e927-77bc-48d1-b0e7-58ddc062fbe1'}
        columnId={'63be5fa5-d490-4fe2-9caf-9becd7d79e66'}
      />
    </>
  );
};

export default Main;
