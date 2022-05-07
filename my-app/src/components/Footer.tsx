import styled from '@emotion/styled';
import { AppBar, Box, Button, Grid, IconButton, Link, Toolbar, Typography } from '@mui/material';
import React, { FC } from 'react';

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

const StyledLink = styled(Link)`
  color: inherit;
  white-space: nowrap;
`;

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
          <Typography>2022</Typography>
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
          {authors.map((author, id) => (
            <Grid item xs key={id}>
              <StyledLink href={author.href} target="_blank" underline="none">
                {author.name}
              </StyledLink>
            </Grid>
          ))}
        </Grid>

        <Grid item xs={4} sm={2} md>
          <Typography>RSSCHOOL</Typography>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Footer;
