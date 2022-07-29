import { IconButton, Tooltip, Zoom } from '@mui/material';
import React, { FC, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import boardsApi from '../../services/boardsService';
import { StyledGridItem, StyledGrid, StyledAddCircleIcon } from './styles';
import { filterByTitle, getToken } from '../../utils/utils';
import BoardCard from '../../components/BoardCard/BoardCard';
import BoardEdit from '../../components/BoardEdit/BoardEdit';
import Loader from '../../components/Loader/Loader';
import MainControls from '../../components/MainControls/MainControls';
import TokenWrapper from '../../containers/TokenWrapper/TokenWrapper';

const Main: FC = () => {
  const { t } = useTranslation();
  const token = getToken();

  const { data: boardsData, isLoading } = boardsApi.useGetAllBoardsQuery({ token });

  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [boards, setBoards] = useState(boardsData);
  const [value, setValue] = useState('');

  useEffect(() => {
    setBoards(boardsData);
  }, [boardsData]);

  useEffect(() => {
    if (!value) {
      setBoards(boardsData);
      return;
    }

    setBoards(filterByTitle(boardsData, value.trim()));
  }, [value, setValue, boardsData]);

  const handleAdd = () => {
    setIsEdit(true);
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <TokenWrapper>
      <MainControls value={value} setValue={setValue} />

      <StyledGrid container spacing={4}>
        {boards &&
          boards.map(({ id, title, description }) => {
            return <BoardCard key={id} id={id} title={title} description={description} />;
          })}

        <StyledGridItem item xs={12} sm={6} md={4}>
          <Tooltip title={t('main.add')} placement="left" TransitionComponent={Zoom}>
            <IconButton onClick={handleAdd}>
              <StyledAddCircleIcon />
            </IconButton>
          </Tooltip>
          {isEdit && <BoardEdit setIsEdit={setIsEdit} type="create" />}
        </StyledGridItem>
      </StyledGrid>
    </TokenWrapper>
  );
};

export default Main;
