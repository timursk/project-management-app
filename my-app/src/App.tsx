import styled from '@emotion/styled';
import { Container } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import i18n from './localization/i18n';
import LanguageToggle from './components/LanguageToggle/LanguageToggle';
import { useTranslation } from 'react-i18next';
import Footer from './components/Footer/Footer';
import Header from './components/Header';
import Login from './components/Login';
import Main from './components/Main';
import NotFound from './components/NotFound';
import RegisterForm from './components/RegisterForm';
import Welcome from './components/Welcome';

const StyledBox = styled(Box)`
  font-size: 24px;
`;

function App() {
  const { t } = useTranslation();
  return (
    <StyledBox>
      <Header />
      <Container>
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/welcome" element={<Welcome />} />
          <Route path="/registration" element={<RegisterForm />} />
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Container>
      <Footer />
    </StyledBox>
  );
}

export default App;
