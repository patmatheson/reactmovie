import Stack from '@mui/material/Stack';
import { Typography } from '@mui/material';
import VotingList from './VotingList';
import GoogleLogin from '../login';

export default function VotingPanel() {
  const movies = [
    {
      id: "gangs",
      name: 'Gangs of New York'
    },
    {
      id: "ela",
      name: 'Escape from LA'
    }
  ];

  return (
    <Stack spacing={2} >
      <Typography textAlign="center" variant="h5" component="div">
        Movie Voting
      </Typography>
      <VotingList />
      <GoogleLogin />
    </Stack>
  );
}