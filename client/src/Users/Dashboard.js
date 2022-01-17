import React from 'react';
import { gql, useQuery } from '@apollo/client';
import { useLocation } from 'react-router-dom';

import Upcoming from './Upcoming';
import { Container } from '@mui/material';

export default function Dashboard() {
  const userId = useLocation().pathname.split('/')[2];

  const { loading, data } = useQuery(FETCH_ONE_USER, {
    variables: { userId },
    onError(err) {
      console.error(err);
    },
  });

  const user = loading ? '' : data.getUser;

  return (
    <Container>
      <h1>{`${user.first_name}'s dashboard`}</h1>
      <h4>Upcoming:</h4>
      <Upcoming classes={user.classes} />
    </Container>
  );
}

const FETCH_ONE_USER = gql`
  query getUser($userId: ID!) {
    getUser(userId: $userId) {
      id
      first_name
      last_name
      email
      username
      created_at
      classes {
        id
        title
      }
      signedup_to {
        id
        title
      }
    }
  }
`;
