import styled from '@emotion/styled';

const StyledModal = styled.main(
  () => `
  padding: 20px;

  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;

  width: 80%;
  max-width: 300px;

  background-color: #ffffff;
  border: 2px solid #1769aa;
  border-radius: 10px;

`
);
export default StyledModal;
