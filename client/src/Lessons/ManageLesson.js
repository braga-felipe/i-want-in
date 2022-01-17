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
  const students = loading ? '' : data.getLesson;
  console.log({ data });
  console.log({ students });

  return <Container></Container>;
}

const FETCH_STUDENTS_QUERY = gql`
  query getStudents($lessonId: ID!) {
    getLesson(lessonId: $lessonId) {
      students {
        id
        first_name
        last_name
      }
    }
  }
`;
