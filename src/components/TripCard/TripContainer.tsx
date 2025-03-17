import { CardContent, Typography } from '@mui/material';
import { Card } from '@nextui-org/react';
import React, { FC } from 'react';
import Icon from '../FontAwesomeIcon';
import Flex from '../Flex';

// Types
type TripCardProps = {
  numberTrip: string;
  dateTrip: string;
  handelView: () => void;
};

const TripCard: FC<TripCardProps> = (props) => {
  const { numberTrip, dateTrip } = props;
  return (
    <Card
      style={{
        backgroundColor: '#f7f9fc',
        borderRadius: '12px',
        boxShadow: '0 4px 14px rgba(0, 0, 0, 0.1)',
        overflow: 'hidden',
        transition: 'transform 0.3s ease'
      }}
    >
      <CardContent>
        <Typography
          variant="h5"
          sx={{
            textAlign: 'center',
            fontWeight: 'bold',
            color: '#3A7D44',
            marginBottom: '10px'
          }}
        >
          {numberTrip}
        </Typography>
        <Typography
          variant="subtitle1"
          sx={{ textAlign: 'center', color: '#888' }}
        >
          {dateTrip}
        </Typography>

        <Flex justifyCenter itemsCenter style={{ gap: 12 }}>
          <Icon name="edit" size="xl" color="blue" />
          <Icon
            name="eye"
            size="xl"
            onClick={() => {
              props.handelView();
            }}
          />
          <Icon name="trash" size="lg" color="red" />
        </Flex>
      </CardContent>
    </Card>
  );
};

export default TripCard;
