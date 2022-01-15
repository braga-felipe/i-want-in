import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router';
import { Grid, Link, TextField, Button, Container } from '@mui/material';
import { gql, useMutation } from '@apollo/client';

import { AuthContext } from '../context/auth';
import { useForm } from '../util/hooks';

const REGISTER_USER = gql`
  mutation register(
    $first_name: String!
    $last_name: String!
    $email: String!
    $username: String!
    $password: String!
    $confirm_password: String!
  ) {
    register(
      registerInput: {
        first_name: $first_name
        last_name: $last_name
        email: $email
        username: $username
        password: $password
        confirm_password: $confirm_password
      }
    ) {
      id
      email
      username
      created_at
      token
    }
  }
`;

export default function Registration() {
  const context = useContext(AuthContext);

  // errors object to check valid user input
  const [errors, setErrors] = useState({});

  // hook for routing on submition of form
  const navigate = useNavigate();

  // gql mutation hook
  const [addUser, { loading }] = useMutation(REGISTER_USER, {
    update(_, { data: { register: userData } }) {
      // we deconstruct the "result" object to get "register" from the "data" property, and pass an alias ("userData") to it for better readibility
      context.login(userData);
      navigate('/', { replace: true });
    },
    onError(err) {
      // set the errors from gql to the errors object
      if (err)
        setErrors(
          err.graphQLErrors[0] ? err.graphQLErrors[0].extensions.errors : {}
        );
    },
  });

  // extract state, onChange and onSubmit from useForm hook
  const { handleChange, handleSubmit, formState } = useForm(addUser, {
    first_name: '',
    last_name: '',
    email: '',
    username: '',
    password: '',
    confirm_password: '',
  });

  // array of input fields used to generate TextFields modularly
  const inputFields = [
    { label: 'First Name', name: 'first_name' },
    { label: 'Last Name', name: 'last_name' },
    { label: 'Email', name: 'email' },
    { label: 'Username', name: 'username' },
    { label: 'Password', name: 'password' },
    { label: 'Confirm Password', name: 'confirm_password' },
  ];

  return (
    <div>
      <h1 style={{ textAlign: 'center' }}>Create an account</h1>
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
                placeholder={field.label}
                variant='filled'
                name={field.name}
                value={formState[field.name]}
                error={errors[field.name] ? true : false}
                type={field.name.includes('password') ? 'password' : ''}
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
        <Grid container>
          <Grid item>
            <Link href='/login' variant='body2'>
              {'Already have an account? Log In'}
            </Link>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}
