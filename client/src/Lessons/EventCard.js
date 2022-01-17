import * as React from 'react';
import { useLocation } from 'react-router-dom';
import { gql, useQuery } from '@apollo/client';
import ButtonAuth from '../buttons/ButtonAuth';
import { FETCH_ONE_USER } from '../Users/Dashboard';

import {
  Card,
  CardActions,
  CardContent,
  Container,
  Link,
  Typography,
} from '@mui/material';

export default function EventCard() {
  // getting lessonID from url using "useLocation" hook
  const lessonId = useLocation().pathname.split('/')[2];

  // --- LESSON QUERY ---
  const { loading, error, data } = useQuery(FETCH_ONE_LESSON, {
    variables: { lessonId },
  });
  if (error) return `Error! ${error.message}`;

  // wait for data to load and organize it
  const lesson = loading ? '' : data.getLesson;
  const teachers = loading
    ? ''
    : lesson.teachers.flatMap((teacher) => teacher.username);
  console.log({ teachers });

  return (
    <Container>
      {
        /*wait for data to load to render lesson*/ loading ? (
          <Typography>Loading...</Typography>
        ) : (
          <Card>
            <CardContent>
              <Typography
                gutterBottom
                variant='h5'
                component='div'
                align='center'>
                {lesson.title}
              </Typography>
              <Typography variant='body2' color='text.secondary' sx={{ mb: 2 }}>
                {lesson.description}
              </Typography>
              <Typography variant='body1' color='text.primary'>
                Teachers:
                {lesson.teachers.map((teacher) => (
                  <Link key={teacher.id}>{teacher.username}</Link>
                ))}
              </Typography>
            </CardContent>
            <CardActions>
              <ButtonAuth lesson={lesson} />
            </CardActions>
          </Card>
        )
      }
    </Container>
  );
}

const FETCH_ONE_LESSON = gql`
  query getLesson($lessonId: ID!) {
    getLesson(lessonId: $lessonId) {
      id
      title
      description
      location
      time
      teachers {
        username
        id
      }
      students {
        id
      }
      studentCount
      created_at
    }
  }
`;
