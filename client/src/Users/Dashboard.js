import React from 'react';
import { gql, useQuery } from '@apollo/client';
import { useLocation } from 'react-router-dom';

export default function Dashboard() {
  const userId = useLocation().pathname.split('/')[2];

  const { loading, data } = useQuery(FETCH_ONE_USER, {
    variables: { userId },
    onError(err) {
      console.error(err);
    },
  });

  const user = loading ? '' : data.getUser;
  console.log(user);

  return (
    <div>
      <h1>User dashboard</h1>
    </div>
  );
}

const FETCH_ONE_USER = gql`
  query getUser($userId: ID!) {
    getUser(userId: $userId) {
      id
      username
      first_name
      last_name
      email
      classes {
        id
        title
        teachers {
          id
        }
      }
      signedup_to {
        id
        title
        teachers {
          id
        }
      }
    }
  }
`;
