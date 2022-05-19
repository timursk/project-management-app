import React, { FC, useState } from 'react';
import columnsApi from '../../services/columnsService';
import { getToken } from '../../utils/utils';
import ColumnDelete from '../ColumnDelete/ColumnDelete';
import UpdateColumn from '../ColumnUpdate/UpdateColumn';
import { StyledColumnCard, StyledBox, StyledTitle, StyledStack } from './style';

interface ColumnCardProps {
  title: string;
  task?: object;
  boardId: string;
  id: string;
  isLoading: boolean;
}

const ColumnCard: FC<ColumnCardProps> = ({ title, boardId, isLoading, id }) => {
  const token = getToken();

  const [isEdit, setEdit] = useState(false);
  const [columnId, setId] = useState('');
  const { data } = columnsApi.useGetColumnByIdQuery({ token, boardId, columnId });
  const [textValue, setText] = useState(title);

  return (
    <>
      <StyledColumnCard
        id={id}
        item
        onClick={(e) => {
          e.currentTarget === e.target && setEdit(false);
          setId(e.currentTarget.id);
        }}
      >
        <StyledBox>
          {isEdit ? (
            <UpdateColumn
              boardId={boardId}
              currentId={columnId}
              data={data}
              handlerSetEdit={setEdit}
              handlerSetText={setText}
              textValue={textValue}
            />
          ) : (
            <StyledTitle
              variant="h5"
              onClick={() => {
                setEdit(true);
              }}
            >
              {textValue}
            </StyledTitle>
          )}
          <ColumnDelete id={columnId} token={token} boardId={boardId} />
        </StyledBox>
        <StyledStack spacing={2}>
          <div style={{ width: '100%', backgroundColor: 'white', minHeight: '300px' }}>Task</div>
        </StyledStack>
      </StyledColumnCard>
    </>
  );
};

export default ColumnCard;
