import styled from '@emotion/styled';
import { Container } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Login from './components/Login';
import Main from './components/Main';
import NotFound from './components/NotFound';
import RegisterForm from './components/RegisterForm';
import Welcom from './components/Welcom';
const StyledBox = styled(Box)`
  font-size: 24px;
`;

function App() {
  return (
    <StyledBox>
      <Header />
      <Container>
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/welcom" element={<Welcom />} />
          <Route path="/register" element={<RegisterForm />} />
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Container>
    </StyledBox>
  );
}

export default App;
