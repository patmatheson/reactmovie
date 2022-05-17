import * as React from 'react';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { Container, TextField, Tooltip, Typography } from '@mui/material';



export default function MoviePanel() {

  const [imdburl, setimdburl] = React.useState('');

  const imdbChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setimdburl(event.target.value);
  };

  const addIMDBMovie = (url: string) => {
    console.log(`Imdb Link is: ${url}`);
    const re = /^https:\/\/www\.imdb\.com\/title\/(tt\d+)\/?/;
    const match = url.match(re);
    console.log(`Regex match: ${match}`);
    if (!match || match.length != 2) {
      alert("Invaild IMDB url.");
      return;
    }
    const imdbId = match[1];
  }

  return (
    <Stack spacing={2} >
      <Typography textAlign="center" variant="h5" component="div">
        Movie Nominations
      </Typography>
      <Stack  direction="row" justifyContent = "space-between" spacing={2}>
        <TextField sx={{ maxWidth:"70%"}} 
          id="movieLink" 
          label="IMDB Link" 
          variant="outlined"
          onChange={imdbChange}
        />
        <Button 
          variant="contained" 
          onClick={() => addIMDBMovie(imdburl)}>
          Submit
        </Button>
      </Stack>
    </Stack>
  );
}