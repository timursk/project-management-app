import React, { FC, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { getToken } from '../../utils/utils';

type Props = {
  children: React.ReactNode;
};

const noTokenRoute = '/welcome';

const TokenWrapper: FC<Props> = ({ children }) => {
  const token = getToken();
  const navigate = useNavigate();
  const { pathname } = useLocation();

  useEffect(() => {
    if (token) {
      return;
    }

    if (!token && pathname !== noTokenRoute) {
      navigate(noTokenRoute);
    }
  }, [navigate, pathname, token]);

  return <>{children}</>;
};

export default TokenWrapper;
