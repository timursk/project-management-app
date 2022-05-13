import { Route, Routes } from 'react-router-dom';
import Footer from './components/Footer/Footer';
import Header from './components/Header';
import Login from './components/Login';
import Main from './components/Main';
import NotFound from './components/NotFound';
import RegisterForm from './components/RegisterForm';

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
            <Route path="/registration" element={<RegisterForm />} />
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
