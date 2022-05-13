import * as React from 'react';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';

interface GenreListProps {
  genres: string[];
}

export default function GenreList(props: GenreListProps) {
  return (
    <Box sx={{ width: '100%', bgcolor: 'background.paper' }}>
        <List dense={true} sx={{overflow: 'auto', maxHeight:600 }}>
            {props.genres.map(genre => (
            <ListItem>
              <ListItemText>
                  {genre}
                </ListItemText>
              </ListItem>))}
        </List>
    </Box>
  );
}