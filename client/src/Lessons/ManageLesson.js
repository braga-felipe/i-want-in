import React from 'react';
import { useLocation } from 'react-router-dom';
import { gql, useQuery } from '@apollo/client';

import UsersList from '../Users/UsersList';
import { Container } from '@mui/material';
import moment from 'moment';

export default function ManageLesson() {
  const lessonId = useLocation().pathname.split('/').pop();

  const { loading, data } = useQuery(FETCH_STUDENTS_QUERY, {
    variables: { lessonId: lessonId },
  });

  const studentsId = loading
    ? ''
    : data && data.getLesson.students.flatMap((student) => student.id);

  const lesson = loading ? '' : data && data.getLesson;
  return (
    <div
      style={{
        boxShadow: '0 0 4px 1px rgb(199, 199, 199)',
        backgroundColor: '#F2EDEB',
        padding: '7px',
        marginTop: '1em',
      }}>
      <Container className='deatils-container'>
        <h2>Details:</h2>
        {lesson && (
          <>
            <h3>{`Title: ${lesson.title}`}</h3>
            <h3>{`Location: ${lesson.location}`} </h3>
            <h3>{`On ${moment(lesson.date).format('LL')} at ${moment(
              lesson.date
            ).format('LT')}`}</h3>
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
    </div>
  );
}

const FETCH_STUDENTS_QUERY = gql`
  query getStudents($lessonId: ID!) {
    getLesson(lessonId: $lessonId) {
      title
      description
      date
      location
      students {
        id
      }
    }
  }
`;
