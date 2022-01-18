import { styled } from '@mui/material';
import { Paper } from '@mui/material';

export const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body1,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.primary,
}));
