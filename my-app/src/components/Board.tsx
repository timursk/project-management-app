import { useParams } from 'react-router-dom';

const Board = () => {
  const { id } = useParams();
  console.log(id);
  return <div>THIS IS A BOARD</div>;
};

export default Board;
