import Stack from '@mui/material/Stack';
import { Button, Typography } from '@mui/material';
import VotingList from './VotingList';
import GoogleLogin from '../login';

interface VotingPanelProps{
  googleUserID: string;
}

export default function VotingPanel(props: VotingPanelProps) {
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
      <VotingList googleUserID={props.googleUserID}/>
      <Button variant="contained" onClick={() => {/*TODO*/}} >Vote</Button>
    </Stack>
  );
}