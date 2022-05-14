import { AppBar, Box, Button, IconButton, Link, Toolbar, Typography } from '@mui/material';
import React, { FC } from 'react';

import LanguageToggle from '../LanguageToggle/LanguageToggle';
import { useTranslation } from 'react-i18next';
import { StyledNavLink } from './style';
import { useAppSelector } from '../../store/hooks';

const Header: FC = () => {
  const { token } = useAppSelector((state) => state.userReducer);
  const { t } = useTranslation();
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
          <LanguageToggle />
          {!'token' ? (
            <>
              <Button color="inherit">
                <StyledNavLink to={'/registration'}>{t('header.registration')}</StyledNavLink>
              </Button>
              <Button color="inherit">
                <StyledNavLink to={'/login'}>{t('header.login')}</StyledNavLink>
              </Button>
            </>
          ) : (
            <>
              <Button color="inherit">
                <StyledNavLink to={'/profile'}>{t('header.registration')}</StyledNavLink>
              </Button>
            </>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Header;
