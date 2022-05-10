import React, { FC, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { Button, Container, Grid, Typography, useMediaQuery } from '@mui/material';
import CardDevelop from '../CardDevelop/CardDevelop';
import { StyledForm, StyledGridItem, StyledImg, StyledTextField } from './style';

const Welcom: FC = () => {
  const { t } = useTranslation();
  const matches = useMediaQuery('(max-width:1100px)');
  const [email, setEmail] = useState('');
  const navigate = useNavigate();

  const handlerEmail = (eve: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    eve.preventDefault();
    setEmail(eve.target.value);
  };

  return (
    <Container>
      <Grid container height={760} alignItems={'center'}>
        <Grid item xs={matches ? 12 : 8}>
          <Typography variant={!matches ? 'h3' : 'h4'} component={'h3'}>
            {t('welcome.header')}
          </Typography>
          <Typography mt={3} mb={3} variant={!matches ? 'subtitle1' : 'subtitle2'} component={'p'}>
            {t('welcome.main')}
          </Typography>
          <StyledForm>
            <StyledTextField
              label="Email"
              variant="outlined"
              value={email}
              onChange={(eve) => handlerEmail(eve)}
            />
            <Button
              onClick={() => navigate('/registration', { state: { email } })}
              variant="contained"
              color="primary"
            >
              <Typography variant="button" component={'span'}>
                {t('welcome.button.registration')}
              </Typography>
            </Button>
          </StyledForm>
        </Grid>

        {!matches && (
          <Grid item xs={4}>
            <StyledImg
              src="https://d2k1ftgv7pobq7.cloudfront.net/meta/p/res/images/spirit/hero/6a3ccd8e5c9a0e8ebea4235d12da6b24/hero.png"
              alt=""
            />
          </Grid>
        )}
      </Grid>
      <div className="team-container">
        <Typography align="center" variant="h4">
          {t('welcome.about.team.name')}
        </Typography>
        <Grid container justifyContent={'space-around'}>
          <StyledGridItem item lg={3} sm={4} md={4}>
            <CardDevelop name="Dmitriy" description="something about Dmitriy" />
          </StyledGridItem>
          <StyledGridItem item lg={3} sm={4} md={4}>
            <CardDevelop name="Timur" description="something about Timur" />
          </StyledGridItem>
          <StyledGridItem item lg={3} sm={4} md={4}>
            <CardDevelop name="Alice" description="something about Alice" />
          </StyledGridItem>
        </Grid>
        <Typography mt={3} variant="subtitle1">
          {t('welcome.about.team.description')}
        </Typography>
      </div>
    </Container>
  );
};

export default Welcom;
