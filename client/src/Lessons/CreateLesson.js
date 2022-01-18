import React, { useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { gql, useMutation } from '@apollo/client';

import { AuthContext } from '../context/auth';
import { useForm } from '../util/hooks';
import { TextField, Button, Container } from '@mui/material';

import { FETCH_LESSONS_QUERY } from './LessonsList';

export default function CreateLesson() {
  const context = useContext(AuthContext);

  const [errors, setErrors] = useState({});

  const navigate = useNavigate();

  // if user not logged in or token is expired, redirect to login
  // TODO: implement logic to check if user is a teacher
  useEffect(() => {
    !context.user && navigate('/login', { replace: true });
  });

  const [addLesson, { loading }] = useMutation(CREATE_LESSON, {
    update(_, result) {
      // TODO: implement logic to navigate to Component with id
      navigate(`/card/${result.data.createLesson.id}`, { replace: true });
    },
    onError(err) {
      console.log({ err });
      if (err)
        setErrors(
          err.graphQLErrors[0] ? err.graphQLErrors[0].extensions.errors : {}
        );
    },
    refetchQueries: [{ query: FETCH_LESSONS_QUERY }],
  });

  // extract state, onChange and onSubmit from useForm hook
  const { handleChange, handleSubmit, formState } = useForm(addLesson, {
    title: '',
    description: '',
    location: '',
    time: '',
    date: '',
    partner: '',
  });

  const inputFields = [
    { label: 'Title', name: 'title' },
    { label: 'Description', name: 'description' },
    { label: 'Location', name: 'location' },
    { label: 'Time', name: 'time' },
    { label: 'Date', name: 'date' },
    { label: 'Partner', name: 'partner' },
  ];

  return (
    <div>
      <h1 style={{ textAlign: 'center' }}>Create an Event</h1>
      <Container maxWidth='xs'>
        <form
          onSubmit={handleSubmit}
          noValidate
          autoComplete='off'
          className={loading ? 'loading' : ''}>
          <div className='form-group'>
            {inputFields.map((field) => (
              <TextField
                sx={{ padding: '3px', margin: '0,2rem' }}
                fullWidth
                key={`field-${field.name}`}
                onChange={handleChange}
                label={field.label}
                variant='filled'
                name={field.name}
                value={formState[field.name]}
                // error={errors && errors[field.name] ? true : false}
                type={
                  field.name === 'time'
                    ? 'time'
                    : field.name === 'date'
                    ? 'date'
                    : ''
                }
                // helperText={errors[field.name] ? errors[field.name] : ''}
              />
            ))}
            <Button
              type='submit'
              fullWidth
              variant='contained'
              sx={{
                mt: 1,
                mb: 2,
                borderRadius: '0px',
                backgroundColor: '#6D8A96',
              }}>
              Submit
            </Button>
          </div>
        </form>
      </Container>
    </div>
  );
}

const CREATE_LESSON = gql`
  mutation createLesson(
    $title: String!
    $description: String!
    $location: String!
    $time: String!
    $date: String!
    $partner: String
  ) {
    createLesson(
      title: $title
      description: $description
      location: $location
      time: $time
      date: $date
      partner: $partner
    ) {
      id
      title
      description
      location
      time
      date
      teachers {
        username
      }
    }
  }
`;
