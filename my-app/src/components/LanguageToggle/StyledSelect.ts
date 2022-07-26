import { Select, styled } from '@mui/material';

const StyledSelect = styled(Select)(() => ({
  height: '40px',
  maxHeight: '100%',
  color: 'inherit',

  '& .MuiOutlinedInput-notchedOutline': {
    border: 'none',
  },
  '& .MuiSvgIcon-root': {
    color: 'inherit',
  },
}));

export default StyledSelect;
