import * as React from 'react';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { Container, Grid, List, ListItem, Paper, styled, TextField, Tooltip, Typography } from '@mui/material';
import { ImdbInfo } from '../imdb';
import { MovieOption } from './MoviePanel';

export interface MovieDisplayProps{
  movieInfo: MovieOption[];
  removeMovie: (movieId: string) => void;
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
    <List>
      {props.movieInfo.map(movie => (
        <ListItem>
          <Item >
            <Stack direction="row">
            <img src={movie.info.poster} width="51" height="75"/>
            <Stack >
              <Typography variant="h5" textAlign="left" >
                {movie.info.name}
              </Typography>
              <Typography  textAlign="left" >
              <b>Starring: </b>{movie.info.actors}
              </Typography>
              <Typography textAlign="left" >
                <b>Nominated by: </b>{movie.info.nominator}
              </Typography>
            </Stack>
          </Stack>
          <Button 
            variant="contained" 
            onClick={() => props.removeMovie(movie.id)}>
            Remove
          </Button>
          </Item>
        </ListItem>
      ))}
    </List>
  );
}