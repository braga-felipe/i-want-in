import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../context/auth';

exports.authRedirect = () => {
  const { user } = useContext(AuthContext);

  return user ? <Navigate replace to='/' /> : false;
};
