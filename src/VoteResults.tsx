import * as React from 'react';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import { getDatabase, ref, set, get, child } from "firebase/database";
import { app } from "./firebase";


const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

interface VoteResultsProps
{
}



export default function VoteResults (props: VoteResultsProps) {

  const db = getDatabase(app);
  
  let allVotes: any[][] = [];
  get(child(ref(db), `votes`)).then((userVotes) => {
    if (userVotes.exists()){
        console.log(userVotes.val());
        userVotes.forEach((user) => {
          let currentVote: any[] = [];
          user.forEach((votes) =>{
            console.log(votes.key, votes.val().movieUuid);
            currentVote.push(votes.val().movieUuid);
          });
          allVotes.push(currentVote);
        });
    } else {
        console.log(`No Data Available`);
    }
  }).catch ((error) => {
    console.error(error);
  })

  console.log(allVotes);
   
  return (
    <Box sx={style}>
      <Stack spacing={2}>
        
      </Stack>
    </Box>
  );
}