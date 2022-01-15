import React, { useContext } from 'react';
import { AuthContext } from '../context/auth';

export default function Home() {
  const { user } = useContext(AuthContext);

  return (
    <div>
      <h1>{user ? `Welcome, ${user.first_name}!` : 'Welcome to WantIn!'}</h1>
    </div>
  );
}
