import * as React from 'react';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { Container, Grid, Paper, styled, TextField, Tooltip, Typography } from '@mui/material';
import { ImdbInfo } from '../imdb';

export interface MovieDisplayProps{
  movieInfo: ImdbInfo
}

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(.5),
  textAlign: 'center',
  color: theme.palette.text.secondary,
  width: "100%"
}));

export default function MovieDisplay(props: MovieDisplayProps) {

  return (
    <Item >
      <Stack direction="row">
      <img src={props.movieInfo.poster} width="51" height="75"/>
      <Stack >
        <Typography variant="h5" textAlign="left" >
          {props.movieInfo.name}
        </Typography>
        <Typography  textAlign="left" >
        <b>Starring: </b>{props.movieInfo.actors}
        </Typography>
        <Typography textAlign="left" >
          <b>Nominated by: </b>{props.movieInfo.nominator}
        </Typography>
      </Stack>
    </Stack>
    </Item>
  );
}