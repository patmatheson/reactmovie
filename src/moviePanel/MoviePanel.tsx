import * as React from 'react';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { Container, TextField, Tooltip, Typography } from '@mui/material';

export default function MoviePanel() {
  return (
    <Stack spacing={2} >
      <Typography textAlign="center" variant="h5" component="div">
        Movie Nominations
      </Typography>
      <Stack  direction="row" justifyContent = "space-between" spacing={2}>
        <TextField sx={{ maxWidth:"70%"}} id="movieLink" label="IMDB Link" variant="outlined" />
        <Button variant="contained" >Submit</Button>
      </Stack>
    </Stack>
  );
}