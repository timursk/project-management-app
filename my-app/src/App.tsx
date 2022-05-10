import { Route, Routes } from 'react-router-dom';
import Footer from './components/Footer/Footer';
import Header from './components/Header';
import Login from './components/user-forms/LoginForm';
import Main from './components/Main';
import NotFound from './components/NotFound';
import RegistrationForm from './components/user-forms/RegistrationForm';

import Welcome from './components/Welcome/Welcome';

import ErrorBoundary from './components/ErrorBoundary/ErrorBoundary';
import { StyledBox, StyledContainer } from './app-styles';

function App() {
  return (
    <StyledBox>
      <Header />
      <ErrorBoundary>
        <StyledContainer>
          <Routes>
            <Route path="/" element={<Main />} />
            <Route path="/welcome" element={<Welcome />} />
            <Route path="/registration" element={<RegistrationForm />} />
            <Route path="/login" element={<Login />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </StyledContainer>
      </ErrorBoundary>
      <Footer />
    </StyledBox>
  );
}

export default App;
