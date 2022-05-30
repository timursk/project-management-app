import { Grid, Typography } from '@mui/material';
import React from 'react';
import { StyledLink } from './styles';

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

const Authors = () => {
  return (
    <>
      {authors.map((author, id) => (
        <Grid item xs key={id}>
          <StyledLink href={author.href} target="_blank">
            <Typography variant="body1">{author.name}</Typography>
          </StyledLink>
        </Grid>
      ))}
    </>
  );
};

export default Authors;
