import styled from '@emotion/styled';
import theme from '../../theme';

const StyledForm = styled.form(() => ({
  display: 'flex',
  flexDirection: 'column',
  width: '80%',
  maxWidth: '300px',
  border: `2px solid ${theme.palette.primary.main}`,
  borderRadius: '10px',
  margin: '20px auto',
}));

export default StyledForm;
