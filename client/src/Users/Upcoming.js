import React from 'react';
import { Grid, Box } from '@mui/material';
import UpcomingItem from './UpcomingItem';
export default function Upcoming({ classes }) {
  let classList = classes ? classes : ['Loading...'];

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2}>
        {classList.map((item, i) => (
          <Grid item xs={15} key={i}>
            <UpcomingItem lesson={item} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
