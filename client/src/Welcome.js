import React from 'react';

export default function Welcome() {
  return (
    <form className='logIn-form'>
      <h2>Log In:</h2>
      <input type='text' placeholder='Username' /> <br />
      <input type='text' placeholder='Password' /> <br />
      <button type='submit'>Ok</button> <br />
      Not registered? <a href='#'>Create an account</a>
    </form>
  );
}
