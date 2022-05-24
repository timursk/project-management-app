import { Grid } from '@mui/material';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ColumnAdd from '../../components/ColumnAdd/ColumnAdd';
import ColumnCard from '../../components/ColumnCard/ColumnCard';
import columnsApi from '../../services/columnsService';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { initOrder } from '../../store/reducers/columnSlice';
import { ColumnResult } from '../../types/api/columnsApiTypes';
import { getToken } from '../../utils/utils';
import { StyledBox, StyledGrid } from './style';

const Board = () => {
  const { id } = useParams();

  const token = getToken();
  const { data, isLoading, isSuccess } = columnsApi.useGetAllColumnsQuery({ boardId: id, token });
  const [sortData, setData] = useState<ColumnResult[]>(data);
  const { order } = useAppSelector((state) => state.columnReducer);
  const dispatch = useAppDispatch();

  const handleSort = (a: ColumnResult, b: ColumnResult) => {
    if (a.order > b.order) {
      return 1;
    }
    if (a.order < b.order) {
      return -1;
    }
  };

  useEffect(() => {
    isSuccess && dispatch(initOrder(parseInt(data.length.toString()) + 1));
    if (data) {
      const sData = [...data];
      sData.sort((a, b) => handleSort(a, b));
      setData(sData);
    }
  }, [data]);

  return (
    <StyledBox>
      <StyledGrid container marginTop={3} flexWrap="nowrap">
        {sortData &&
          sortData.map(({ id: columnId, title }) => (
            <ColumnCard
              boardId={id}
              key={columnId}
              id={columnId}
              isLoading={isLoading}
              title={title}
            ></ColumnCard>
          ))}
        <ColumnAdd boardId={id} order={order} />
      </StyledGrid>
    </StyledBox>
  );
};

export default Board;
