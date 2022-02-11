import * as React from 'react';
import { useContext } from 'react';
import { AuthContext } from '../context/auth';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Slide,
} from '@mui/material';

import { gql, useMutation } from '@apollo/client';
const DELETE_LESSON = gql`
  mutation deleteLesson($lessonId: ID!) {
    deleteLesson(lessonId: $lessonId)
  }
`;
const SIGNUP_TO_LESSON = gql`
  mutation signupToLesson($lessonId: ID!, $userId: ID!) {
    signupToLesson(lessonId: $lessonId, userId: $userId)
  }
`;
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction='up' ref={ref} {...props} />;
});

export default function ButtonAuth({ lesson, idx }) {
  const { user } = useContext(AuthContext);
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const teachers = lesson.teachers.flatMap((teacher) => teacher.username);

  const navigate = useNavigate();
  const navidateToLogin = () => {
    navigate('/login', { replace: true });
  };
  const navigateToManageLesson = () => {
    navigate(`/manage/${lesson.id}`, { replace: true });
  };
  const navigateToLessons = () => {
    navigate('/lessons', { replace: true });
  };

  const [deleteLesson] = useMutation(DELETE_LESSON, {
    variables: { lessonId: lesson.id },
    update(_, result) {
      navigate('/lessons', { replace: true });
      alert(result.data.deleteLesson);
      window.location.reload();
    },
    onError(err) {
      console.log({ err });
    },
  });

  const [signupToLesson] = useMutation(SIGNUP_TO_LESSON, {
    variables: { lessonId: lesson.id, userId: user.id },
    onError(err) {
      console.log({ err });
    },
  });

  const signupAndClose = () => {
    if (user) {
      signupToLesson();
      handleClose();
      window.location.reload();
    } else {
      navidateToLogin();
    }
  };

  const buttonStyle = () => {
    return {
      ml: 1,
      mt: 1,
      mb: 1,
      borderRadius: '0px',
      backgroundColor: '#6D8A96',
    };
  };

  const signedButtonStyle = () => {
    return {
      ml: 1,
      mt: 1,
      mb: 1,
      borderRadius: '0px',
      backgroundColor: 'white',
      color: 'green',
    };
  };

  return (
    <Container>
      {!user ? (
        <Button
          variant='contained'
          sx={buttonStyle()}
          onClick={navidateToLogin}>
          Sign Up
        </Button>
      ) : teachers.includes(user.username) ? (
        <>
          <Button
            variant='contained'
            sx={buttonStyle()}
            onClick={navigateToManageLesson}>
            Manage
          </Button>
          <Button variant='contained' sx={buttonStyle()} onClick={deleteLesson}>
            Delete
          </Button>
        </>
      ) : lesson.students.filter((student) => student.id === user.id).length ? (
        <Button sx={signedButtonStyle()} variant='outlined'>
          Signed Up
        </Button>
      ) : (
        <>
          <Button
            variant='contained'
            sx={buttonStyle()}
            onClick={handleClickOpen}>
            Sign Up
          </Button>
          <Dialog
            open={open}
            TransitionComponent={Transition}
            keepMounted
            onClose={handleClose}
            aria-describedby='alert-dialog-slide-description'>
            <DialogTitle>
              {'Do you want to sign up to this lesson?'}
            </DialogTitle>
            <DialogContent>
              <DialogContentText id='alert-dialog-slide-description'>
                You will be added to the list of students, making your contact
                information available to the instructor.
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose}>Cancel</Button>
              <Button onClick={signupAndClose}>Confirm</Button>
            </DialogActions>
          </Dialog>
        </>
      )}
      <Button
        variant='contained'
        sx={buttonStyle()}
        onClick={navigateToLessons}>
        Back to Lessons
      </Button>
    </Container>
  );
}
