import React from 'react';
import { useLocation } from 'react-router-dom';
import { gql, useQuery } from '@apollo/client';

import UsersList from '../Users/UsersList';
import { Container } from '@mui/material';

export default function ManageLesson() {
  const lessonId = useLocation().pathname.split('/').pop();
  console.log({ lessonId });
  const { loading, data } = useQuery(FETCH_STUDENTS_QUERY, {
    variables: { lessonId },
  });
  console.log({ loading });
  console.log({ data });
  const studentsId = loading
    ? ''
    : data && data.getLesson.students.flatMap((student) => student.id);

  const lesson = loading ? '' : data && data.getLesson;

  return (
    <Container className='manage-container'>
      <Container className='deatils-container'>
        <h2>Details:</h2>
        {lesson && (
          <>
            <h3>{`Title: ${lesson.title}`}</h3>
            <h3>
              {`Location: ${lesson.location},  starting the ${lesson.date} at ${lesson.time}`}{' '}
            </h3>
          </>
        )}
      </Container>
      <Container className='students-container'>
        {studentsId && (
          <>
            <h3>Students ({studentsId.length}): </h3>
            <UsersList studentsId={studentsId}></UsersList>
          </>
        )}
      </Container>
    </Container>
  );
}

const FETCH_STUDENTS_QUERY = gql`
  query getStudents($lessonId: ID!) {
    getLesson(lessonId: $lessonId) {
      title
      description
      time
      date
      location
      students {
        id
      }
    }
  }
`;
