import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import GenrePanel from './genrePanel/GenrePanel';
import MoviePanel from './moviePanel/MoviePanel';
import VotingPanel from './votingPanel/VotingPanel';

interface ThreePanelLayoutProps {
  googleUserID: string;
}

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(2),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

export default function ThreePaneLayout(props: ThreePanelLayoutProps) {
  return (
   
      <Grid container spacing={2} columns={12}>
        <Grid item xs={12} md={4}>
            <Item>
                <GenrePanel googleUserID={props.googleUserID} />
            </Item>
        </Grid>
        <Grid xs={12} md={4}>
          <Item>
            <MoviePanel />
          </Item>
        </Grid>
        <Grid xs={12} md={4}>
         <Item>
            <VotingPanel googleUserID={props.googleUserID} />
          </Item>
        </Grid>
      </Grid>
    
  );
}