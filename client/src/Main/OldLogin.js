import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { gql, useMutation } from '@apollo/client';

//MUI imports
import {
  Button,
  CssBaseline,
  TextField,
  Link,
  Grid,
  Box,
  Typography,
  Container,
} from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';

export default function LogIn() {
  //MUI LOGIN
  function Copyright(props) {
    return (
      <Typography
        variant='body2'
        color='text.secondary'
        align='center'
        {...props}>
        {'Copyright © '}
        <Link color='inherit' href='https://mui.com/'>
          I-Want-In
        </Link>{' '}
        {new Date().getFullYear()}
        {'.'}
      </Typography>
    );
  }

  const theme = createTheme();

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    // eslint-disable-next-line no-console
    console.log({
      username: data.get('username'),
      password: data.get('password'),
    });
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component='main' maxWidth='xs'>
        <CssBaseline />
        <Box
          sx={{
            marginTop: 2,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}>
          <h1 style={{ textAlign: 'center' }}>Sign In</h1>
          <Box
            component='form'
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 0.5 }}>
            <TextField
              sx={{ padding: '3px', margin: '0,2rem' }}
              required
              fullWidth
              variant='filled'
              id='username'
              label='Username'
              name='username'
              autoComplete='username'
              autoFocus
            />
            <TextField
              sx={{ padding: '3px', margin: '0,2rem' }}
              required
              fullWidth
              variant='filled'
              name='password'
              label='Password'
              type='password'
              id='password'
              autoComplete='current-password'
            />

            <Button
              type='submit'
              fullWidth
              variant='contained'
              sx={{ mt: 1, mb: 2 }}>
              Sign In
            </Button>
            <Grid container>
              <Grid item>
                <Link href='/register' variant='body2'>
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>
  );
}
