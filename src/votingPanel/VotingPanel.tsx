import * as React from 'react';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { Container, List, ListItem, TextField, Tooltip, Typography } from '@mui/material';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import ListItemText from '@mui/material/ListItemText';

export default function VotingPanel() {
  const [movies, setGenres] = React.useState([
    'Gangs of New York',
    'Escape from LA'
  ]);

  const tempDragEnd = () =>{

  }


  return (
    <Stack spacing={2} >
      <Typography textAlign="center" variant="h5" component="div">
        Movie Voting
      </Typography>
      <DragDropContext onDragEnd={tempDragEnd}>
        <Droppable droppableId='movies'>
          {(provided) => (
            <ul className="movies" {...provided.droppableProps} ref={provided.innerRef}>
              {movies.map((movies, index) => {
                return (
                  <Draggable key={movies} draggableId={movies} index={index}>
                    {(provided) => (
                      <li  ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                        <p>
                          { movies }
                        </p>
                      </li>
                    )}
                  </Draggable>                      
                );
              })}
              
            </ul>
          )}
        </Droppable>
      </DragDropContext>
    </Stack>
  );
}