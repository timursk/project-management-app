import { Button, Stack } from '@mui/material';
import React, { Dispatch, FC, SetStateAction, useState } from 'react';
import columnsApi from '../../services/columnsService';
import { Column } from '../../types/store/storeTypes';
import { StyledField } from '../Column/style';
import CheckSharpIcon from '@mui/icons-material/CheckSharp';
import ClearSharpIcon from '@mui/icons-material/ClearSharp';
import { getToken } from '../../utils/utils';

interface UpdateColumnProps {
  boardId: string;
  currentId: string;
  handlerSetEdit: Dispatch<SetStateAction<boolean>>;
  handlerSetText: Dispatch<SetStateAction<string>>;
  data: Column;
  textValue: string;
}

const UpdateColumn: FC<UpdateColumnProps> = ({
  boardId,
  currentId,
  handlerSetEdit,
  handlerSetText,
  data,
  textValue,
}) => {
  const token = getToken();

  const [updateColumn, {}] = columnsApi.useUpdateColumnMutation();

  const handleUpdate = () => {
    updateColumn({ token, boardId, columnId: currentId, title: textValue, order: data.order });
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
