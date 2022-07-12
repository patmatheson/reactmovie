import Stack from '@mui/material/Stack';
import { Button, Typography } from '@mui/material';
import VotingList from './VotingList';
import GoogleLogin from '../login';
import { voteSubmit } from './voteSubmit';
import { getAuth, Auth, User } from "firebase/auth";
import { getDatabase, ref, remove, set, get } from "firebase/database";
import { useList, useListVals, useObjectVal } from 'react-firebase-hooks/database'
import { useState } from 'react';
import { app } from "../firebase";


interface VotingPanelProps{
  googleUserID: string;
}

export default function VotingPanel(props: VotingPanelProps) {
  
  const db = getDatabase(app);
  const auth = (getAuth() as Auth);
  const currentUserId = (auth.currentUser as User).uid;
  const lockedInfo = {locked : true};

  const [voteLocked, setVoteLocked] = useState(false);
  const [voteButtonText, setVoteButtonText] = useState("Vote");
  const lockedDBRef = ref(db, `locked/${currentUserId}`);

  let localLock: string[] = [];

  function lockVote () {
    setVoteLocked(true);
    setVoteButtonText("Locked");
    set(lockedDBRef, lockedInfo);
  }

  function unlockVote () {
    setVoteLocked(false);
    setVoteButtonText("Vote");
    remove(lockedDBRef);
  }

  const lockToggle = () => {
    if (voteLocked){
      unlockVote();
    }
    else if (!voteLocked){
      lockVote();
    }
  }

  return (
    <Stack spacing={2} >
      <Typography textAlign="center" variant="h5" component="div">
        Movie Voting
      </Typography>
      <VotingList googleUserID={props.googleUserID}/>
      <Button variant="contained" onClick={lockToggle}> {voteButtonText} </Button>
    </Stack>
  );
}