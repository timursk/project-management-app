import styled from '@emotion/styled';
import { AppBar, Box, Button, IconButton, Link, Toolbar, Typography } from '@mui/material';
import React, { FC } from 'react';
import { NavLink } from 'react-router-dom';

const StyledNavLink = styled(NavLink)`
  color: inherit;
  text-decoration: none;
`;

const Header: FC = () => {
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
            <StyledNavLink to={'/'}> Header </StyledNavLink>
          </Typography>
          <Button color="inherit">
            <StyledNavLink to={'/registration'}> Sign-up </StyledNavLink>
          </Button>
          <Button color="inherit">
            <StyledNavLink to={'/login'}> Login </StyledNavLink>
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Header;
