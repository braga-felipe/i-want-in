import React, { useEffect } from 'react';
import { gql, useQuery } from '@apollo/client';
import { Container } from '@mui/material';
import LessonItem from './LessonItem';

export default function LessonsList() {
  const { loading, data } = useQuery(FETCH_LESSONS_QUERY);

  return (
    <div>
      <h1>Lessons List</h1>
      <Container component='main' maxWidth='xs'>
        {loading
          ? 'Loading lessons...'
          : data.getLessons.map((lesson, idx) => (
              <LessonItem lesson={lesson} idx={idx} key={`lesson${idx}`} />
            ))}
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
      time
      teachers {
        username
      }
    }
  }
`;
