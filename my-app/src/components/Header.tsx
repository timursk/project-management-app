import styled from '@emotion/styled';
import { AppBar, Box, Button, IconButton, Toolbar, Typography } from '@mui/material';
import React, { FC } from 'react';
import { NavLink } from 'react-router-dom';
import LanguageToggle from './LanguageToggle/LanguageToggle';
import { useTranslation } from 'react-i18next';
import UserMenu from './UserMenu/UserMenu';
import { getToken } from '../utils/utils';

const StyledNavLink = styled(NavLink)`
  color: inherit;
  text-decoration: none;
`;

const Header: FC = () => {
  const { t } = useTranslation();
  const token = getToken();

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
