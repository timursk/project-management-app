import { Box, Grid, Link, Typography } from '@mui/material';
import React, { FC } from 'react';
import logo from '../../assets/rss-logo.svg';
import Authors from '../Authors/Authors';
import { StyledGrid, StyledImg } from './styles';

const gridProps = {
  columnSpacing: 3,
  columns: { xs: 4, sm: 12, md: 12 },
};

const Footer: FC = () => {
  return (
    <Box sx={{ backgroundColor: 'primary.main', color: 'primary.contrastText' }}>
      <StyledGrid container {...gridProps}>
        <Grid item xs={4} sm={2} md>
          <Typography variant="h6" component="p">
            2022
          </Typography>
        </Grid>

        <Grid item container xs={4} sm md="auto" {...gridProps}>
          <Authors />
        </Grid>

        <Grid item xs={4} sm={2} md>
          <Link href="https://rs.school/" target="_blank">
            <StyledImg src={logo} alt="rsschool logo" />
          </Link>
        </Grid>
      </StyledGrid>
    </Box>
  );
};

export default Footer;
