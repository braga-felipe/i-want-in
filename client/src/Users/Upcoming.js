import React from 'react';
import { Grid, Box } from '@mui/material';
import UpcomingItem from './UpcomingItem';
export default function Upcoming({ user }) {
  let classList = user
    ? user.classes.concat(user.signedup_to).flatMap((item) => item)
    : ['Loading...'];

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2}>
        {classList.map((classItem, i) => (
          <Grid item xs={15} key={i}>
            <UpcomingItem user={user} lesson={classItem} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
