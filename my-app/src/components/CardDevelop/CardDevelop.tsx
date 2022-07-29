import { Card, CardActionArea, CardMedia, CardContent, Typography } from '@mui/material';
import React, { FC } from 'react';
import person from '../../assets/images/person.png';

interface CardDevelopProps {
  name: string;
  description: string;
}

const CardDevelop: FC<CardDevelopProps> = ({ name, description }) => {
  return (
    <Card>
      <CardActionArea>
        <CardMedia image={person} component="img" alt="person" />
        <CardContent>
          <Typography variant="h5" component="p">
            {name}
          </Typography>
          <Typography variant="body1" color="text.secondary">
            {description}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default CardDevelop;
