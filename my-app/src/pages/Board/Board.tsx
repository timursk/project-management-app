import { useParams } from 'react-router-dom';
import ColumnAdd from '../../components/ColumnAdd/ColumnAdd';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { StyledBox, StyledGrid } from './style';
import columnsApi from '../../services/columnsService';
import { getToken } from '../../utils/utils';
import { useState, useEffect } from 'react';
import { initOrder } from '../../store/reducers/columnSlice';
import { ColumnResult } from '../../types/api/columnsApiTypes';
import Column from '../../components/Column/Column';

const Board = () => {
  const { id } = useParams();
  const { order } = useAppSelector((state) => state.columnReducer);
  const token = getToken();
  const { data, isSuccess, isLoading } = columnsApi.useGetAllColumnsQuery({ token, boardId: id });
  const [sortData, setData] = useState<ColumnResult[]>(data);
  const [idColumns, setId] = useState<string[]>([]);
  const dispatch = useAppDispatch();

  useEffect(() => {
    isSuccess && dispatch(initOrder(parseInt(data.length.toString()) + 1));

    if (data) {
      const sData = [...data];
      sData.sort((a, b) => a.order - b.order);
      setData(sData);
    }
  }, [data]);

  return (
    <StyledBox>
      <StyledGrid container marginTop={3} flexWrap="nowrap">
        {sortData &&
          sortData.map((column) => (
            <Column key={column.id} boardId={id} columnId={column.id} title={column.title} />
          ))}
        <ColumnAdd boardId={id} order={order} />
      </StyledGrid>
    </StyledBox>
  );
};

export default Board;
