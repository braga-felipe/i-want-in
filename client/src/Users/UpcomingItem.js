import React from 'react';
import { useNavigate } from 'react-router';
import { gql, useQuery } from '@apollo/client';

import { Container, Button } from '@mui/material';

import moment from 'moment';
import { Item } from '../mui/Item';

export default function UpcomingItem({ user, lesson }) {
  // navigate funtion
  const navigate = useNavigate();
  const navigateToManageCard = () => {
    navigate(`/manage/${lesson.id}`, { replace: true });
  };
  const navigateToCard = () => {
    navigate(`/card/${lesson.id}`, { replace: true });
  };

  const { data } = useQuery(FETCH_LESSON_INFO, {
    variables: { lessonId: lesson.id },
  });

  const info = data && data.getLesson;

  return (
    <Container sx={{ display: 'flex', width: '100%' }}>
      <Item sx={timeStyle()}>{info && moment(info.date).format('ddd')}</Item>
      <Item sx={titleStyle()}>
        <div style={{ textAlign: 'left' }}>{lesson.title}</div>
        <div style={{ textAlign: 'left' }}>
          {moment(lesson.date).format('LT - LL')}
        </div>
        {user && user.classes.filter((item) => item.id === lesson.id).length ? (
          <Button
            variant='contained'
            sx={buttonStyle()}
            onClick={navigateToManageCard}>
            Manage
          </Button>
        ) : (
          <Button
            variant='contained'
            sx={buttonStyle()}
            onClick={navigateToCard}>
            More Info
          </Button>
        )}
      </Item>
    </Container>
  );
}
const FETCH_LESSON_INFO = gql`
  query getLesson($lessonId: ID!) {
    getLesson(lessonId: $lessonId) {
      title
      date
      location
      teachers {
        id
        first_name
      }
    }
  }
`;

const timeStyle = () => {
  return {
    backgroundColor: '#6D8A96',
    color: 'white',
    fontFamily: 'Ubuntu',
    fontWeight: 'bold',
    fontSize: '20px',
    textAlign: 'center',
    padding: '10px 10px',
    borderRadius: '0px',
  };
};

const titleStyle = () => {
  return {
    fontSize: '20px',
    fontFamily: 'Ubuntu',
    fontWeight: 'bold',
    textAlign: 'center',
    borderRadius: '0px',
    width: '100%',
  };
};

const buttonStyle = () => {
  return {
    float: 'right',
    ml: 2,
    borderRadius: '0px',
    backgroundColor: '#6D8A96',
  };
};
