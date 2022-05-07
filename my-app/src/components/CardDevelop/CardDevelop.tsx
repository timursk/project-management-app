import { Card, CardActionArea, CardMedia, CardContent, Typography } from '@mui/material';
import React, { FC } from 'react';
import person from '../../assets/images/person.png';

interface CardDevelopProps {
  name: string;
  description: string;
}

const CardDevelop: FC<CardDevelopProps> = ({ name, description }) => {
  return (
    <Card sx={{ marginTop: '30px' }}>
      <CardActionArea>
        <CardMedia image={person} component="img" height={220} alt="green iguana" />

        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {description}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default CardDevelop;
