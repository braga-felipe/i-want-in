import React from 'react';
import { useNavigate } from 'react-router';
import { Box, Container, Button } from '@mui/material';
import moment from 'moment';

export default function NextLesson({ user }) {
  const navigate = useNavigate();
  // const navigateToManageCard = () => {
  //   navigate(`/manage/${lesson.id}`, { replace: true });
  // };
  // const navigateToCard = () => {
  //   navigate(`/card/${lesson.id}`, { replace: true });
  // };
  const nextLesson = !user
    ? ''
    : user.classes
        .concat(user.signedup_to)
        .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
        .shift();
  console.log('NEXT LESSON ', { nextLesson });
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        // textAlign: 'center',
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
const buttonStyle = () => {
  return {
    float: 'right',
    ml: 2,
    mt: 1,
    mb: 1,
    borderRadius: '0px',
    backgroundColor: 'white',
  };
};
