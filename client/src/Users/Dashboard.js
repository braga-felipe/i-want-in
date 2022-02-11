import React from 'react';
import { gql, useQuery } from '@apollo/client';
import { useLocation } from 'react-router-dom';

import NextLesson from './NextLesson';
import Upcoming from './Upcoming';

export default function Dashboard() {
  const userId = useLocation().pathname.split('/').pop();

  const { loading, data } = useQuery(FETCH_ONE_USER, {
    variables: { userId },
    onError(err) {
      console.error(err);
    },
  });

  const user = loading ? '' : data.getUser;
  const nextLesson = loading
    ? ''
    : user.classes
        .concat(user.signedup_to)
        .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
        .shift();

  return (
    <div
      style={{
        boxShadow: '0 0 4px 1px rgb(199, 199, 199)',
        backgroundColor: '#F2EDEB',
        padding: '7px',
        marginTop: '1em',
      }}>
      <h2
        style={{ textAlign: 'center' }}>{`${user.first_name}'s dashboard`}</h2>
      <NextLesson user={user} />
      <Upcoming
        style={{ boxShadow: '0 0 4px 1px rgb(199, 199, 199)' }}
        user={user}
      />
    </div>
  );
}

export const FETCH_ONE_USER = gql`
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
        date
        location
      }
      signedup_to {
        id
        title
        date
        location
      }
    }
  }
`;
