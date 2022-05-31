import * as React from 'react';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { Container, TextField, Tooltip, Typography, List, ListItem } from '@mui/material';
import { imdbLookup, ImdbInfo } from '../imdb';
import { v4 as uuidv4 } from 'uuid';
import MovieDisplay from './MovieDisplay';
import { getDatabase, ref, remove, set } from "firebase/database";
import { app } from "../firebase";
import { useList } from 'react-firebase-hooks/database';



export interface MovieOption
{
  info: ImdbInfo;
  id: string;
}



export default function MoviePanel() {
  const db = getDatabase(app);

  const [imdburl, setimdburl] = React.useState('');
  const [nominator, setNominator] = React.useState('');

  const moviesRef = ref(db, 'movies');
  const [movieSnapshots, loading, error] = useList(moviesRef);

  const imdbChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setimdburl(event.target.value);
  };

  const nominatorChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNominator(event.target.value);
  };

  const removeMovie = (movieId: string) => {
    remove(ref (db, `movies/${movieId}`));
  }

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
    const movieId = uuidv4();
    
    console.log(imdbInfo);

    setimdburl(''); // clear back the text field
    setNominator('');
    
    set(ref(db, `movies/${movieId}`), {info: imdbInfo, id:movieId});
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
        {loading && <span>Loading...</span>}
        {!loading && movieSnapshots && (
          <MovieDisplay movieInfo={movieSnapshots.map(v => v.val())} removeMovie={removeMovie} />
        )}
    </Stack>
  );
}