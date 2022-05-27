import { Button, Stack } from '@mui/material';
import React, { Dispatch, FC, SetStateAction } from 'react';
import columnsApi from '../../services/columnsService';
import { StyledField } from '../ColumnComponent/style';
import CheckSharpIcon from '@mui/icons-material/CheckSharp';
import ClearSharpIcon from '@mui/icons-material/ClearSharp';
import { getToken } from '../../utils/utils';
import { ColumnResult } from '../../types/api/columnsApiTypes';

interface UpdateColumnProps {
  boardId: string;
  currentId: string;
  handlerSetEdit: Dispatch<SetStateAction<boolean>>;
  handlerSetText: Dispatch<SetStateAction<string>>;
  column: ColumnResult;
  textValue: string;
}

const UpdateColumn: FC<UpdateColumnProps> = ({
  boardId,
  currentId,
  handlerSetEdit,
  handlerSetText,
  column,
  textValue,
}) => {
  const token = getToken();

  const [updateColumn, {}] = columnsApi.useUpdateColumnMutation();

  const handleUpdate = () => {
    updateColumn({ token, boardId, columnId: currentId, title: textValue, order: column.order });
    handlerSetEdit(false);
  };

  return (
    <>
      <Stack>
        <Button onClick={() => handlerSetEdit(false)} variant="outlined">
          <ClearSharpIcon />
        </Button>
        <Button onClick={handleUpdate} variant="contained">
          <CheckSharpIcon />
        </Button>
      </Stack>

      <StyledField
        value={textValue}
        autoFocus
        onChange={(e) => handlerSetText(e.target.value)}
        inputProps={{
          style: {
            fontSize: '1.5rem',
            border: 'none',
            background: 'white',
          },
        }}
      ></StyledField>
    </>
  );
};

export default UpdateColumn;
