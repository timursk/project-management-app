import styled from '@emotion/styled';
import theme from '../../theme';

const StyledModal = styled.main(
  () => `
  position: relative;
  padding: 20px;

  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;

  width: 80%;
  max-width: 400px;

  background-color: #ffffff;
  border: 2px solid ${theme.palette.primary.main};
  border-radius: 10px;

`
);
export default StyledModal;
