import styled from '@emotion/styled';
import { Box, Grid, Link, Typography } from '@mui/material';
import React, { FC } from 'react';
import logo from '../assets/rss-logo.svg';

const authors = [
  {
    name: 'timursk',
    href: 'https://github.com/timursk',
  },
  {
    name: 'komalapa',
    href: 'https://github.com/komalapa',
  },
  {
    name: 'firsov-dmitriy',
    href: 'https://github.com/firsov-dmitriy',
  },
];

const Authors: FC = () => {
  return (
    <>
      {authors.map((author, id) => (
        <Grid item xs key={id}>
          <StyledLink href={author.href} target="_blank">
            {author.name}
          </StyledLink>
        </Grid>
      ))}
    </>
  );
};

const StyledLink = styled(Link)({
  color: 'inherit',
  whiteSpace: 'nowrap',
  transition: '0.1s',
  textDecoration: 'none',
  ':hover': {
    color: '#8b8b8b',
  },
});

const StyledImg = styled.img({
  height: 45,
  padding: '5px 0',
  filter: 'invert(98%) sepia(9%) saturate(281%) hue-rotate(112deg) brightness(114%) contrast(100%)',
  transition: '0.1s',
  ':hover': {
    filter: 'invert(60%) sepia(1%) saturate(0%) hue-rotate(115deg) brightness(91%) contrast(88%)',
  },
});

const Footer: FC = () => {
  return (
    <Box sx={{ backgroundColor: 'primary.main', color: 'primary.contrastText' }}>
      <Grid
        container
        columnSpacing={3}
        columns={{ xs: 4, sm: 12, md: 12 }}
        sx={{ alignItems: 'center', textAlign: 'center' }}
      >
        <Grid item xs={4} sm={2} md>
          <Typography variant="h6" component="p">
            2022
          </Typography>
        </Grid>

        <Grid
          item
          container
          columnSpacing={6}
          columns={{ xs: 4, sm: 12, md: 12 }}
          xs={4}
          sm
          md="auto"
        >
          <Authors />
        </Grid>

        <Grid item xs={4} sm={2} md>
          <StyledLink href="https://rs.school/" target="_blank">
            <StyledImg src={logo} alt="rsschool logo" />
          </StyledLink>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Footer;
