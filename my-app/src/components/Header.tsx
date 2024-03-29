import styled from '@emotion/styled';
import React, { FC, useMemo, useState } from 'react';
import {
  AppBar,
  Button,
  Fab,
  IconButton,
  Toolbar,
  Typography,
  useMediaQuery,
  useScrollTrigger,
} from '@mui/material';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import LanguageToggle from './LanguageToggle/LanguageToggle';
import { useTranslation } from 'react-i18next';
import UserMenu from './UserMenu/UserMenu';
import { getToken } from '../utils/utils';
import { useAppSelector } from '../store/hooks';
import BoardEdit from './BoardEdit/BoardEdit';
import ScrollTopButton from './ScrollTopButton';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

const Header: FC = () => {
  const { t } = useTranslation();
  const [show, setShow] = useState(false);
  const { isLoading, login } = useAppSelector((store) => store.userReducer);
  const token = useMemo(() => getToken(), [login, isLoading]);
  const matches = useMediaQuery('(max-width:420px)');

  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
  });
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const isBoard = pathname.match(/board/i);

  return (
    <>
      <AppBar
        sx={isBoard ? BoardRouteStyles : defaultStyles}
        position="sticky"
        color={trigger ? 'secondary' : 'primary'}
      >
        <Toolbar sx={{ minHeight: '40px', height: '100%' }}>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            <StyledNavLink to={'/'}>{t('header.title')}</StyledNavLink>
          </Typography>

          {isBoard && (
            <Button
              onClick={() => {
                navigate(-1);
              }}
              color="inherit"
              variant="outlined"
            >
              {t('header.goBack')}
            </Button>
          )}

          {pathname === '/' && (
            <Button
              color="inherit"
              onClick={() => setShow(true)}
              variant={'outlined'}
              sx={{ maxHeight: '45px' }}
            >
              {t('header.create')}
            </Button>
          )}

          {show && <BoardEdit setIsEdit={setShow} type={'create'} />}

          {pathname.toLowerCase() === '/welcome' && token && (
            <Button color="inherit" onClick={() => navigate('/')} variant={'outlined'}>
              {matches ? t('header.goMainCut') : t('header.goMain')}
            </Button>
          )}

          {token ? (
            <UserMenu />
          ) : (
            <>
              <Button color="inherit">
                <StyledNavLink to={'/registration'}>{t('header.registration')}</StyledNavLink>
              </Button>
              <Button color="inherit">
                <StyledNavLink to={'/login'}>{t('header.login')}</StyledNavLink>
              </Button>
            </>
          )}

          <LanguageToggle />
        </Toolbar>
      </AppBar>
      <ScrollTopButton>
        <Fab color="secondary" size="small" aria-label="scroll back to top">
          <KeyboardArrowUpIcon />
        </Fab>
      </ScrollTopButton>
    </>
  );
};

const StyledNavLink = styled(NavLink)`
  color: inherit;
  text-decoration: none;
`;

const defaultStyles = {
  height: '8vh',
  display: 'flex',
  justifyContent: 'center',
};

const BoardRouteStyles = {
  position: 'fixed',
  width: '100vw',
  ...defaultStyles,
};

export default Header;
