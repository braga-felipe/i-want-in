import { useContext } from 'react';
import { useNavigate } from 'react-router';
import { AuthContext } from '../context/auth';

export function useRedirect() {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  return user ? navigate('/', { replace: true }) : true;
}
