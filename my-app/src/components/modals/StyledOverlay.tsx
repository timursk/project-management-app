import styled from '@emotion/styled';

const StyledOverlay = styled.main(
  () => `
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.7);

  display: flex;
  justify-content: center;
  align-items: center
`
);
export default StyledOverlay;
