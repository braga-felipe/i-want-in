import React from 'react';
import { useNavigate } from 'react-router';
import { styled } from '@mui/material';
import { Paper, Button } from '@mui/material';

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

export default function UpcomingItem({ item }) {
  const navigate = useNavigate();
  const navigateToCard = () => {
    navigate(`/manage/${item.id}`, { replace: true });
  };
  return (
    <Item>
      {item.title}
      <Button onClick={navigateToCard}>Manage</Button>
    </Item>
  );
}
// onClick={navigate}
