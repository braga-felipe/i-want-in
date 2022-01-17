import React from 'react';
import { Box, Grid } from '@mui/material';
import UserItem from './UserItem';

export default function UsersList({ studentsId }) {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2}>
        {studentsId.map((userId, i) => (
          <Grid item xs={8} key={i}>
            <UserItem userId={userId} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
