import { IconButton, List, ListItem } from '@mui/material';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import DragHandleIcon from '@mui/icons-material/DragHandle';
import ListItemText from '@mui/material/ListItemText';

export default function VotingList() {
  const movies = [
    {
      id: "gangs",
      name: 'Gangs of New York'
    },
    {
      id: "ela",
      name: 'Escape from LA'
    }
  ];



  const tempDragEnd = () =>{

  }


  return (
    <DragDropContext onDragEnd={tempDragEnd}>
      <Droppable droppableId='movies'>
        {(provided) => (
          <List className="movies" {...provided.droppableProps} ref={provided.innerRef}>
            {movies.map(({id, name}, index) => {
              return (
                <Draggable key={id} draggableId={id} index={index}>
                  {(provided) => (
                    <ListItem  ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                      <ListItemText primary={ name } />
                      <IconButton edge="end">
                          <DragHandleIcon />
                      </IconButton>
                    </ListItem>
                  )}
                </Draggable>                      
              );
            })}
            
          </List>
        )}
      </Droppable>
    </DragDropContext>
  );
}