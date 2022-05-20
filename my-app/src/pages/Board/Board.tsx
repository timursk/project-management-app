import { useParams } from 'react-router-dom';

const Board = () => {
  const { id } = useParams();
  console.log(id);
  // const { data, isError, isLoading } = columnsApi.useGetAllColumnsQuery({ boardId: id, token });
  return <div>THIS IS A BOARD</div>;
};

export default Board;
