import { Route, Routes } from 'react-router-dom';
import Footer from './components/Footer/Footer';
import Header from './components/Header';
import Login from './components/user-forms/LoginForm';
import Main from './pages/Main/Main';
import NotFound from './pages/NotFound/NotFound';
import RegistrationForm from './components/user-forms/RegistrationForm';
import Board from './pages/Board/Board';
import Welcome from './pages/Welcome/Welcome';
import ErrorBoundary from './containers/ErrorBoundary/ErrorBoundary';
import { StyledBox, StyledContainer } from './app-styles';
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from './store/hooks';
import { initUser } from './store/reducers/actionCreators';
import EditProfileForm from './components/user-forms/EditProfileForm';
import { getToken } from './utils/utils';

function App() {
  const dispatch = useAppDispatch();
  const token = getToken();
  const { login } = useAppSelector((store) => store.userReducer);

  useEffect(() => {
    dispatch(initUser());
  }, [dispatch]);

  useEffect(() => {
    if (token) dispatch(initUser());
  }, [dispatch, token]);

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
            <Route path="/board/:id" element={<Board />} />
            <Route path="/profile" element={<EditProfileForm />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </StyledContainer>
      </ErrorBoundary>
      <Footer />
    </StyledBox>
  );
}

export default App;
