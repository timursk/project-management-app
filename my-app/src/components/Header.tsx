import styled from '@emotion/styled';
import React, { FC, useMemo, useState } from 'react';
import {
  AppBar,
  Button,
  Fab,
  IconButton,
  Toolbar,
  Typography,
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

const StyledNavLink = styled(NavLink)`
  color: inherit;
  text-decoration: none;
`;

const defaultStyles = {
  height: '8vh',
};

const BoardRouteStyles = {
  position: 'fixed',
  width: '100vw',
  ...defaultStyles,
};

const Header: FC = () => {
  const { t } = useTranslation();
  const [show, setShow] = useState(false);
  const { isLoading, login } = useAppSelector((store) => store.userReducer);
  const token = useMemo(() => getToken(), [login, isLoading]);

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
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          ></IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            <StyledNavLink to={'/'}>{t('header.title')}</StyledNavLink>
          </Typography>
          {pathname.includes('/board/') && (
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
            <Button color="inherit" onClick={() => setShow(true)} variant={'outlined'}>
              {t('header.create')}
            </Button>
          )}
          {show && <BoardEdit setIsEdit={setShow} type={'create'} />}
          {pathname.toLowerCase() === '/welcome' && token && (
            <Button color="inherit" onClick={() => navigate('/')} variant={'outlined'}>
              {t('header.goMain')}
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

export default Header;
