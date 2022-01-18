import React from 'react';
import { gql, useQuery } from '@apollo/client';

import { Item } from '../mui/Item';

export default function UserItem({ userId }) {
  const { loading, data } = useQuery(FETCH_USER_NAMES, {
    variables: { userId },
  });

  return (
    <Item>
      {loading
        ? 'Loading...'
        : `${data.getUser.first_name} ${data.getUser.last_name}`}
    </Item>
  );
}

const FETCH_USER_NAMES = gql`
  query getUser($userId: ID!) {
    getUser(userId: $userId) {
      first_name
      last_name
    }
  }
`;
