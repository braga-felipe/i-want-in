import React from 'react';
import { Grid, Box } from '@mui/material';
import UpcomingItem from './UpcomingItem';
export default function Upcoming({ user }) {
  let classList = user
    ? user.classes
        .concat(user.signedup_to)
        .flatMap((item) => item)
        .sort((a, b) => {
          return new Date(a.date).getTime() - new Date(b.date).getTime();
        })
    : ['Loading...'];
  return (
    <>
      <h3>Upcoming:</h3>
      <Box
        sx={{
          padding: '3px',
          boxShadow: '0 0 4px 1px rgb(199, 199, 199)',
          backgroundColor: 'white',
          flexGrow: 1,
        }}>
        <Grid container spacing={2}>
          {classList.length <= 1 || classList.includes('loading') ? (
            <Grid item xs={15}>
              <h2>No Lessons yet...</h2>
            </Grid>
          ) : (
            classList.map((classItem, i) => {
              if (classList.indexOf(classItem)) {
                return (
                  <Grid item xs={15} key={i}>
                    <UpcomingItem user={user} lesson={classItem} />
                  </Grid>
                );
              }
            })
          )}
        </Grid>
      </Box>
    </>
  );
}
