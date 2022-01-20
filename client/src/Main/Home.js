import React, { useContext } from 'react';
import { AuthContext } from '../context/auth';

export default function Home() {
  const { user } = useContext(AuthContext);

  return (
    <div
      style={{
        boxShadow: '0 0 4px 1px rgb(199, 199, 199)',
        backgroundColor: '#F2EDEB',
        padding: '7px',
        marginTop: '1em',
        height: '100%',
      }}>
      <h1 style={{ textAlign: 'center' }}>Welcome to WantIn!</h1>
    </div>
  );
}
