import React, { ChangeEvent, Dispatch, FormEvent, SetStateAction, useState } from 'react';
import boardsApi from '../../services/boardsService';
import BoardEditControls from '../BoardEditControls/BoardEditControls';
import { StyledEditBox, StyledInput, StyledInputBox } from './styles';

type Props = {
  id: string;
  title: string;
  setIsEdit: Dispatch<SetStateAction<boolean>>;
};

const token =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiIxOTNiNjY4NS00OTA0LTRlNGMtYWM5MS00MGRjNjBhN2JlZTkiLCJsb2dpbiI6InRlc3QiLCJpYXQiOjE2NTIyNjg3NzF9.z3z283PgbUDkcblzNR-SZO01qW68dRPGWQxLy-X_ydQ';

const BoardEdit = ({ id, title, setIsEdit }: Props) => {
  const [value, setValue] = useState<string>('');

  const [updateBoard, {}] = boardsApi.useUpdateBoardMutation();

  const handleUpdate = (e: FormEvent) => {
    e.preventDefault();

    if (value.length > 40) {
      alert('TOO BIG');
      return;
    }

    updateBoard({ id, token, title: value });
    setIsEdit(false);
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setValue(value);
  };

  return (
    <StyledEditBox>
      <StyledInputBox component="form" onSubmit={handleUpdate}>
        <StyledInput autoFocus onChange={handleChange} placeholder={title} />
      </StyledInputBox>

      <BoardEditControls value={value} setIsEdit={setIsEdit} handleUpdate={handleUpdate} />
    </StyledEditBox>
  );
};

export default BoardEdit;
