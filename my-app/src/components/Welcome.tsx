<<<<<<< HEAD
import React, { FC } from 'react';
=======
import React, { FC, useState } from 'react';
>>>>>>> c4171f1 (fix: card position)
import { useTranslation } from 'react-i18next';
<<<<<<< HEAD

const Welcom: FC = () => {
  const { t } = useTranslation();
  return <div>{t('welcome.header')}</div>;
=======
import { useNavigate } from 'react-router-dom';
import {
  Button,
  Container,
  FormControl,
  Grid,
  TextField,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import CardDevelop from './CardDevelop/CardDevelop';

const Welcom: FC = () => {
  const { t } = useTranslation();
  const matches = useMediaQuery('(max-width:1100px)');
  const [email, setEmail] = useState('');
  const navigate = useNavigate();

  const handlerEmail = (eve: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    eve.preventDefault();
    setEmail(eve.target.value);
  };
  const styleText = {
    marginRight: 3,
    width: '80%',
  };
  const styleForm = {
    flexDirection: 'row',
    width: '80%',
  };

  return (
    <Container>
      <Grid container height={760} alignItems={'center'}>
        <Grid xs={matches ? 12 : 8}>
          <Typography variant={!matches ? 'h3' : 'h4'} component={'h3'}>
            {t('welcome.header')}
          </Typography>
          <Typography mt={3} mb={3} variant={!matches ? 'subtitle1' : 'subtitle2'} component={'p'}>
            {t('welcome.main')}
          </Typography>
          <FormControl sx={styleForm}>
            <TextField
              label="Email"
              variant="outlined"
              value={email}
              onChange={(eve) => handlerEmail(eve)}
              sx={styleText}
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
          </FormControl>
        </Grid>

        {!matches && (
          <Grid xs={4}>
            <img
              src="https://d2k1ftgv7pobq7.cloudfront.net/meta/p/res/images/spirit/hero/6a3ccd8e5c9a0e8ebea4235d12da6b24/hero.png"
              alt=""
              style={{ maxWidth: '445', height: '550px' }}
            />
          </Grid>
        )}
      </Grid>
      <div className="team-container">
        <Typography align="center" variant="h4">
          {t('welcome.about.team.name')}
        </Typography>
        <Grid container justifyContent={'space-around'}>
          <Grid item xl={3} xs={7}>
            <CardDevelop name="Dmitriy" description="something about Dmitriy" />
          </Grid>
          <Grid item xl={3} xs={7}>
            <CardDevelop name="Timur" description="something about Timur" />
          </Grid>
          <Grid item xl={3} xs={7}>
            <CardDevelop name="Timur" description="something about Timur" />
          </Grid>
        </Grid>
        <Typography mt={3} variant="subtitle1">
          {t('welcome.about.team.description')}
        </Typography>
      </div>
    </Container>
  );
<<<<<<< HEAD
  // >>>>>>> 11f6752 (feat: create first elment and send-state to sign)
>>>>>>> 16288f1 (feat: team elemnt and refactor)
=======
>>>>>>> c4171f1 (fix: card position)
};

export default Welcom;
