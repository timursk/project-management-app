import { Button, Stack } from '@mui/material';
import React, { Dispatch, FC, SetStateAction, useState } from 'react';
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
  refetch: () => void;
}

const UpdateColumn: FC<UpdateColumnProps> = ({
  boardId,
  currentId,
  handlerSetEdit,
  handlerSetText,
  column,
  textValue,
  refetch,
}) => {
  const token = getToken();

  const [value, setValue] = useState(textValue);
  const [updateColumn, {}] = columnsApi.useUpdateColumnMutation();

  const handleUpdate = async () => {
    await updateColumn({
      token,
      boardId,
      columnId: currentId,
      title: value,
      order: column.order,
    });
    refetch();
    handlerSetText(value);
    handlerSetEdit(false);
  };

  return (
    <>
      <StyledField
        value={value}
        autoFocus
        onChange={(e) => setValue(e.target.value)}
        inputProps={{
          style: {
            fontWeight: '500',
            border: 'none',
            background: 'white',
          },
        }}
      />

      <Stack>
        <Button onClick={() => handlerSetEdit(false)} variant="outlined">
          <ClearSharpIcon />
        </Button>
        <Button onClick={handleUpdate} variant="contained">
          <CheckSharpIcon />
        </Button>
      </Stack>
    </>
  );
};

export default UpdateColumn;
