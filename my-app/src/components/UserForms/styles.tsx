import styled from '@emotion/styled';
import { FormControlLabel } from '@mui/material';

export const CentredSwitchLabel = styled(FormControlLabel)(() => ({ alignSelf: 'center' }));

export const FormErrorMessage = styled.div(() => ({
  width: '100%',
  color: '#D8000C',
  backgroundColor: '#FFD2D2',
  fontSize: '0.8em',
  padding: '5px',
  boxSizing: 'border-box',
  textAlign: 'center',
}));
