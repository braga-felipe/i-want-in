import React, { useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { gql, useMutation } from '@apollo/client';

import { AuthContext } from '../context/auth';
import { useForm } from '../util/hooks';
import { TextField, Button, Container } from '@mui/material';

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
      console.log(result);
      // TODO: implement logic to navigate to Component with id
      // navigate('/lesson:id', {replace: true});
    },
    onError(err) {
      console.log({ err });
      if (err)
        setErrors(
          err.graphQLErrors[0] ? err.graphQLErrors[0].extensions.errors : {}
        );
    },
  });

  // extract state, onChange and onSubmit from useForm hook
  const { handleChange, handleSubmit, formState } = useForm(addLesson, {
    title: '',
    description: '',
    location: '',
    time: '',
    partner: '',
  });

  const inputFields = [
    { label: 'Title', name: 'title' },
    { label: 'Description', name: 'description' },
    { label: 'Location', name: 'location' },
    { label: 'Time', name: 'time' },
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
                // placeholder={field.label}
                variant='filled'
                name={field.name}
                value={formState[field.name]}
                error={errors[field.name] ? true : false}
                type={field.name.includes('time') ? 'date' : ''}
                helperText={errors[field.name] ? errors[field.name] : ''}
              />
            ))}
            <Button
              type='submit'
              fullWidth
              variant='contained'
              sx={{ mt: 1, mb: 2 }}>
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
    $partner: String
  ) {
    createLesson(
      title: $title
      description: $description
      location: $location
      time: $time
      partner: $partner
    ) {
      id
      title
      description
      location
      time
      teachers {
        username
      }
    }
  }
`;
