import React from 'react';
import { useLocation } from 'react-router-dom';
import { gql, useQuery } from '@apollo/client';

import UsersList from '../Users/UsersList';
import { Container } from '@mui/material';

export default function ManageLesson() {
  const lessonId = useLocation().pathname.split('/')[2];
  const { loading, data } = useQuery(FETCH_STUDENTS_QUERY, {
    variables: { lessonId },
  });
  const studentsId = loading
    ? ''
    : data.getLesson.students.flatMap((student) => student.id);
  studentsId && console.log('DATA.GETLESSON: ', data.getLesson);
  return (
    <Container className='manage-container'>
      <Container className='deatils-container'>
        <h2>Details:</h2>
        <h3>{`Title: ${studentsId && data.getLesson.title}`}</h3>
        <h3>{`Location: ${studentsId && data.getLesson.location} Time: ${
          studentsId && data.getLesson.time
        }`}</h3>
      </Container>
      <Container className='students-container'>
        <h3>Students ({studentsId && studentsId.length}): </h3>
        {studentsId && <UsersList studentsId={studentsId}></UsersList>}
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
      location
      students {
        id
      }
    }
  }
`;
