import styled from '@emotion/styled';
import { AppBar, Box, Button, IconButton, Toolbar, Typography } from '@mui/material';
import React, { FC, useMemo, useState } from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import LanguageToggle from './LanguageToggle/LanguageToggle';
import { useTranslation } from 'react-i18next';
import UserMenu from './UserMenu/UserMenu';
import { getToken } from '../utils/utils';
import { useAppSelector } from '../store/hooks';
import BoardEdit from './BoardEdit/BoardEdit';

const StyledNavLink = styled(NavLink)`
  color: inherit;
  text-decoration: none;
`;

const Header: FC = () => {
  const { t } = useTranslation();
  const { login } = useAppSelector((store) => store.userReducer);
  const token = useMemo(() => getToken(), [login]);
  const [show, setShow] = useState(false);

  const navigate = useNavigate();
  const { pathname } = useLocation();
  console.log(pathname);

  return (
    <Box>
      <AppBar position="static">
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
    </Box>
  );
};

export default Header;
