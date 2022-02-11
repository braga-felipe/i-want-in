import React from 'react';
import { Box } from '@mui/material';
import moment from 'moment';

export default function NextLesson({ user }) {
  const nextLesson = !user
    ? ''
    : user.classes
        .concat(user.signedup_to)
        .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
        .shift();
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: '#6D8A96',
        color: 'white',
      }}>
      <div style={{ float: 'left', marginLeft: '1em' }}>NEXT LESSON</div>
      {nextLesson ? (
        <div style={{ textAlign: 'center' }}>
          <h2>{nextLesson.title}</h2>
          <h3> {moment(nextLesson.date).format('LT - LL')}</h3>
          <h3> at {nextLesson.location}</h3>
        </div>
      ) : (
        <div style={{ textAlign: 'center' }}>
          <h2>No lessons yet...</h2>
        </div>
      )}
    </Box>
  );
}
