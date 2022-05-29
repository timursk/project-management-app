import styled from '@emotion/styled';
import { Card } from '@mui/material';

const StyledTaskWrapper = styled.div(() => ({
  color: 'rgba(0, 0, 0, 0.87)',
  transition: 'box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms, border 0.3s',
  borderRadius: '4px',
  boxShadow:
    '0px 2px 1px -1px rgb(0 0 0 / 20%), 0px 1px 1px 0px rgb(0 0 0 / 14%), 0px 1px 3px 0px rgb(0 0 0 / 12%)',
  margin: '5px 0',
  maxWidth: '300px',
  padding: '10px',
  backgroundColor: '#f5f5f5',
  border: '1px solid lightgrey',
  ':hover': {
    border: '1px solid black',
  },
  ':first-child': {
    marginTop: '0px',
  },
  '&.div:last-child': {
    marginBottom: '0px',
  },
}));

export default StyledTaskWrapper;
