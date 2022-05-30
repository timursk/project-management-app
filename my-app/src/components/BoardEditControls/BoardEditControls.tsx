import { Button } from '@mui/material';
import React, { Dispatch, FormEvent, SetStateAction } from 'react';
import { StyledBox, StyledButtonDiscard } from './styles';

type Props = {
  value: string;
  setIsEdit: Dispatch<SetStateAction<boolean>>;
  handleUpdate: (e: FormEvent) => void;
};

const BoardEditControls = ({ value, setIsEdit, handleUpdate }: Props) => {
  return (
    <StyledBox>
      <StyledButtonDiscard
        size="small"
        color={'error'}
        variant="outlined"
        onClick={() => setIsEdit(false)}
      >
        discard
      </StyledButtonDiscard>
      <Button
        size="small"
        color={value.length <= 40 ? 'success' : 'error'}
        disabled={value.length > 40 ? true : false}
        variant="outlined"
        onClick={handleUpdate}
      >
        save
      </Button>
    </StyledBox>
  );
};

export default BoardEditControls;
