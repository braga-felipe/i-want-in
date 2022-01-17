import React from 'react';
import { useNavigate } from 'react-router';
import { gql, useQuery } from '@apollo/client';
import { styled } from '@mui/material';
import { Paper, Button, Container } from '@mui/material';
import moment from 'moment';

export const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

export default function UpcomingItem({ lesson }) {
  const navigate = useNavigate();
  const navigateToCard = () => {
    navigate(`/manage/${lesson.id}`, { replace: true });
  };

  const { data } = useQuery(FETCH_LESSON_INFO, {
    variables: { lessonId: lesson.id },
  });

  const info = data && data.getLesson;
  console.log(info);

  return (
    <Container sx={{ display: 'flex' }}>
      <Item
        sx={{
          backgroundColor: '#6D8A96',
          color: 'white',
          fontFamily: 'Ubuntu',
          fontWeight: 'bold',
          fontSize: '20px',
          textAlign: 'center',
          padding: '15px 15px',
        }}>
        {info && moment(info.time).format('ddd')}
      </Item>
      <Item>
        {lesson.title}
        <Button
          variant='contained'
          sx={{ ml: 2, mt: 1, mb: 2 }}
          onClick={navigateToCard}>
          Manage
        </Button>
      </Item>
    </Container>
  );
}
const FETCH_LESSON_INFO = gql`
  query getLesson($lessonId: ID!) {
    getLesson(lessonId: $lessonId) {
      title
      time
      location
    }
  }
`;
