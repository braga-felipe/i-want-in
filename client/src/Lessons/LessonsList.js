import React from 'react';
import { gql, useQuery } from '@apollo/client';
import { Container } from '@mui/material';
import LessonItem from './LessonItem';

export default function LessonsList() {
  const { loading, data } = useQuery(FETCH_LESSONS_QUERY);

  console.log({ data });
  const sortedLessons = data && [...data.getLessons];

  return (
    <div
      style={{
        marginTop: '1em',
        boxShadow: '0 0 4px 1px rgb(199, 199, 199)',
        backgroundColor: '#F2EDEB',
        padding: '7px',
      }}>
      <h2 style={{ textAlign: 'center' }}>Lessons List</h2>
      <Container
        sx={{
          border: '1px solid',
          backgroundColor: 'white',
          overflowY: 'scroll',
          height: '370px',
        }}>
        <Container component='main' maxWidth='xs'>
          {loading
            ? 'Loading lessons...'
            : sortedLessons
                .sort(
                  (a, b) =>
                    new Date(a.date).getTime() - new Date(b.date).getTime()
                )
                .map((lesson, idx) => (
                  <LessonItem lesson={lesson} idx={idx} key={`lesson${idx}`} />
                ))}
        </Container>
      </Container>
    </div>
  );
}

export const FETCH_LESSONS_QUERY = gql`
  {
    getLessons {
      id
      title
      description
      location
      date
      teachers {
        username
      }
    }
  }
`;
