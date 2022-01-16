import React, { useContext } from 'react';
import { AuthContext } from '../context/auth';
import { useNavigate } from 'react-router-dom';

import { Container, Button } from '@mui/material';

import { gql, useMutation } from '@apollo/client';
const DELETE_LESSON = gql`
  mutation deleteLesson($lessonId: ID!) {
    deleteLesson(lessonId: $lessonId)
  }
`;

export default function ButtonAuth({ lesson, idx }) {
  const { user } = useContext(AuthContext);
  const teachers = lesson.teachers.flatMap((teacher) => teacher.username);
  const navigate = useNavigate();
  const [deleteLesson] = useMutation(DELETE_LESSON, {
    variables: { lessonId: lesson.id },
    update(_, result) {
      //TODO: handle the reaload of the "events" page without using 'window.location.reaload()'
      navigate('/events', { replace: true });
      alert(result.data.deleteLesson);
      window.location.reload();
    },
    onError(err) {
      console.log({ err });
    },
  });

  return (
    <Container>
      {!user ? (
        <Button
          variant='contained'
          sx={{ ml: 2, mt: 1, mb: 2 }}
          onClick={() => navigate('/login', { replace: true })}>
          Sign Up
        </Button>
      ) : teachers.includes(user.username) ? (
        <>
          <Button
            variant='contained'
            sx={{ ml: 2, mt: 1, mb: 2 }}
            onClick={() =>
              navigate(`/edit-event/${lesson.id}`, { replace: true })
            }>
            Edit
          </Button>
          <Button
            variant='contained'
            sx={{ ml: 2, mt: 1, mb: 2 }}
            onClick={deleteLesson}>
            Delete
          </Button>
        </>
      ) : (
        <Button
          variant='contained'
          sx={{ ml: 2, mt: 1, mb: 2 }}
          onClick={() => navigate(`/signup/${lesson.id}`, { replace: true })}>
          Sign Up
        </Button>
      )}
      <Button
        variant='contained'
        sx={{ ml: 2, mt: 1, mb: 2 }}
        onClick={() => {
          navigate('/events', { replace: true });
        }}>
        {' '}
        Back to Events
      </Button>
    </Container>
  );
}
