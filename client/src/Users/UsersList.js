import React from 'react';
import { useQuery, gql } from '@apollo/client';
import { Box, Grid } from '@mui/material';
import UserItem from './UserItem';

export default function UsersList() {
  const { loading, data } = useQuery(FETCH_USERS_QUERY);
  let usersList = loading ? ['Loading...'] : data.getUsers;
  console.log(usersList);
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2}>
        {usersList.map((item, i) => (
          <Grid item xs={8} key={i}>
            <UserItem item={item} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

export const FETCH_USERS_QUERY = gql`
  {
    getUsers {
      id
      first_name
      last_name
      email
      username
    }
  }
`;
