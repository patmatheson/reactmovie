import * as React from 'react';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { Container, TextField, Tooltip, Typography, List, ListItem } from '@mui/material';
import { imdbLookup, ImdbInfo } from '../imdb';
import { v4 as uuidv4 } from 'uuid';
import MovieDisplay from './MovieDisplay';

interface MovieOption
{
  info: ImdbInfo;
  id: string;
}

const defaultMovieOptions : MovieOption[] = [];

export default function MoviePanel() {

  const [imdburl, setimdburl] = React.useState('');
  const [nominator, setNominator] = React.useState('');

  const [movieOptions, setMovieOptions] = React.useState(defaultMovieOptions);

  const imdbChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setimdburl(event.target.value);
  };

  const nominatorChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNominator(event.target.value);
  };

  const addIMDBMovie = async (url: string, nominator: string) => {
    console.log(`Imdb Link is: ${url}`);
    const re = /^https:\/\/www\.imdb\.com\/title\/(tt\d+)\/?/;
    const match = url.match(re);
    console.log(`Regex match: ${match}`);
    if (!match || match.length != 2) {
      alert("Invaild IMDB url.");
      return;
    }
    const imdbId = match[1];
    const imdbInfo = await imdbLookup(imdbId, nominator);
    
    console.log(imdbInfo);

    // I think this is fucking up the thingy, i think it's not triggering a re-render for some reason
    setimdburl(''); // clear back the text field
    setNominator('');

    const newMovieOptions = Array.from(movieOptions);
    newMovieOptions.push({info: imdbInfo, id: uuidv4()})
    setMovieOptions(newMovieOptions);



    console.log(movieOptions);
  }

  return (
    <Stack spacing={2} >
      <Typography textAlign="center" variant="h5" component="div">
        Movie Nominations
      </Typography>
      <TextField sx={{ maxWidth:"70%"}} 
        id="movieLink" 
        label="IMDB Link" 
        variant="outlined"
        value={imdburl}
        onChange={imdbChange}
      />
      <Stack direction="row" justifyContent = "space-between" spacing={2}>
        <TextField sx={{ maxWidth:"70%"}} 
          id="nominatorLink" 
          label="Nominated By" 
          variant="outlined"
          value={nominator}
          onChange={nominatorChange}
        />
        <Button 
          variant="contained" 
          onClick={() => addIMDBMovie(imdburl, nominator)}>
          Submit
        </Button>
      </Stack>
      
      <List>
        {movieOptions.map(movie => (
          <ListItem>
            <MovieDisplay movieInfo={movie.info} />
          </ListItem>
       ))}
      </List>
    </Stack>
  );
}