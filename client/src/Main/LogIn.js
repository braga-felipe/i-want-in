import React from 'react';

export default function LogIn() {
  return (
    <>
      <h1>Welcome</h1>
      <form className='logIn-form'>
        <h2>Log In:</h2>
        <input type='text' placeholder='Username' /> <br />
        <input type='text' placeholder='Password' /> <br />
        <button type='submit'>Ok</button> <br />
        Not registered? <a href='#'>Create an account</a>
      </form>
    </>
  );
}
