import * as React from 'react';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import GenreList from './GenreList';
import UpdateGenres from './UpdateGenres';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import Chip from '@mui/material/Chip';
import { Container, Tooltip } from '@mui/material';
import { getDatabase, ref, set } from "firebase/database";
import { app } from "../firebase";
import { useList } from 'react-firebase-hooks/database';

interface GenrePanelProps {
  googleUserID: string;
}



export default function GenrePanel(props: GenrePanelProps) {
  const db = getDatabase(app);

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [weeklyGenre, setWeeklyGenre] = React.useState("Unselected");
  const genresRef = ref(db, 'genres');
  const [genreSnapshots, loading, error] = useList(genresRef);
   
  const updateGenres = (genres: string[]) => {
    handleClose();
    set(genresRef, genres);
  }

  const selectRandomGenre = () => {
    if (!genreSnapshots) return;
    const genres = genreSnapshots.map(v => v.val());
    setWeeklyGenre(genres[Math.floor(Math.random()*genres.length)]);
  }


  return (
    
    <Stack spacing={2} > 
      <Typography textAlign="center" variant="h5" component="div">
        Genre Selection
      </Typography>
      <Stack  direction="row" justifyContent = "space-between" spacing={2}>
        <Tooltip title={weeklyGenre}>
            <Chip sx={{ maxWidth: "73%", typography: 'h6' }} label={weeklyGenre} variant="outlined" />
        </Tooltip>
        <Button variant="outlined" >Veto</Button>
      </Stack>
        {loading && <span>List: Loading...</span>}
        {!loading && genreSnapshots && (
          <GenreList genres={genreSnapshots.map(v => v.val())} />
        )}
      <Stack direction="row" justifyContent = "space-between" spacing={2}>
        <Button variant="contained" onClick={selectRandomGenre} disabled={loading}>Choose Random</Button>
        <Button variant="outlined" onClick={handleOpen}>Update List</Button>
      </Stack>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description">
        <Box>
          {loading && <span>List: Loading...</span>}
          {!loading && genreSnapshots && (
            <UpdateGenres submit={updateGenres} inputGenres={genreSnapshots.map(v => v.val())} />
          )}
        </Box>
        {/* <Box sx={modalStyle}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Text in a modal
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
          </Typography>
        </Box> */}
      </Modal>
    </Stack>
    // todo The "current selected one"
    // Veto button
    
    // select random at bottom
    
  );
}