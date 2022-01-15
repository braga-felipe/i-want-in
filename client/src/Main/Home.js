import React, { useContext } from 'react';
import { AuthContext } from '../context/auth';
import { Navigate } from 'react-router-dom';

export default function Home() {
  const { user } = useContext(AuthContext);

  return (
    <div>
      <h1>{user ? `Welcome, ${user.username}!` : 'Welcome to WantIn!'}</h1>
    </div>
  );
}
