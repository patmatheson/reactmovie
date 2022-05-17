import { IconButton, List, ListItem } from '@mui/material';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import DragHandleIcon from '@mui/icons-material/DragHandle';
import ListItemText from '@mui/material/ListItemText';
import react, { useState } from 'react';

export default function VotingList() {
  const defaultMovies = [
    {
      id: "gangs",
      name: 'Gangs of New York'
    },
    {
      id: "ela",
      name: 'Escape from LA'
    }
  ];

  const [movies, setMovies] = useState(defaultMovies);

  const DragEnd = (result: any) =>{
    console.log (result);
    const items = Array.from(movies);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    setMovies(items);
  }

  

  return (
    <DragDropContext onDragEnd={DragEnd}>
      <Droppable droppableId="movies">
        {(provided) => (
          <List className="movies" {...provided.droppableProps} ref={provided.innerRef}>
            {movies.map(({id, name}, index) => {
              return (
                <Draggable key={id} draggableId={id} index={index}>
                  {(provided) => (
                    <ListItem  
                      ref= {provided.innerRef} 
                      {...provided.draggableProps} 
                      >
                      <ListItemText primary={ name } />
                      <IconButton edge="end" {...provided.dragHandleProps}>
                          <DragHandleIcon />
                      </IconButton>
                    </ListItem>
                  )}
                </Draggable>                      
              );
            })}
            {provided.placeholder}
          </List>
      )}
      </Droppable>
    </DragDropContext>
  );
}