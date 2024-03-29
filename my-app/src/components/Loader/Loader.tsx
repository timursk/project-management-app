import CircularProgress from '@mui/material/CircularProgress';
import { FC } from 'react';
import ErrorScreenWrapper from '../../containers/ErrorBoundary/ErrorScreenWrapper';

const Loader: FC = () => (
  <ErrorScreenWrapper>
    <CircularProgress />
  </ErrorScreenWrapper>
);

export default Loader;
