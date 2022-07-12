import { IconButton, List, ListItem } from '@mui/material';
import DragHandleIcon from '@mui/icons-material/DragHandle';
import ListItemText from '@mui/material/ListItemText';

import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import React from 'react';

import { app } from "../firebase";
import { getDatabase, ref, remove, set, get } from "firebase/database";
import { useList, useListVals, useObjectVal } from 'react-firebase-hooks/database';

import { MovieOption } from '../moviePanel/MoviePanel'
import getMovieName, { getMovieInfo } from '../movieName';



interface VotingListProps{
  googleUserID: string;
}

export interface MovieRank {
  movieUuid: string;
  rank: number;
}

export default function VotingList(props: VotingListProps) {
  const db = getDatabase(app);
  const votingRef = ref(db, `votes/${props.googleUserID}`);
  const movieRef = ref(db, 'movies');
  const [votingSnapshot, votingloading, votingerror] = useObjectVal<MovieRank[]>(votingRef);
  const [movies, moviesloading, movieserror] = useListVals<MovieOption>(movieRef);
  
  
  const renderInfo: MovieOption[] = [];
  let localVotes: MovieRank[] = [];

  if (votingSnapshot){
    for (const vote of votingSnapshot){
      localVotes.push(vote);
    }
  }

  if (movies)
  {
    var newMovies : string[] = [];
    for (const movie of movies) {
      let found = false;
      for (const vote of localVotes){
        if (vote.movieUuid === movie.id)
        {
          found = true;
        }
      }
      if (!found){
        console.log(`detected new movie: {movie.id}`)
        newMovies.push(movie.id);
      }
    }
    

    if (newMovies){
      // add new movies to the database
      let nextRank = 0;
      if (localVotes.length>0){
        nextRank = localVotes[localVotes.length-1].rank;
      }
      for (const newMovie of newMovies) {
        nextRank++;
        const newMovieRank : MovieRank = {movieUuid: newMovie, rank: nextRank };
        localVotes.push(newMovieRank);
      }
      set(votingRef, localVotes);
    }

    for  (const vote of localVotes){
      const movieName = getMovieInfo(vote.movieUuid);
      if (movieName)
      {
        renderInfo.push(movieName);
      }
    }
  }



  const DragEnd = (result: any) =>{
    console.log (result);
    const items = Array.from(localVotes);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    set(votingRef, items);
  }



  return (
    <DragDropContext onDragEnd={DragEnd}>
      <Droppable droppableId="movies">
        {(provided) => (
          <List className="movies" {...provided.droppableProps} ref={provided.innerRef}>
            {renderInfo.map((movieOption, index) => {
              return (
                <Draggable key={movieOption.id} draggableId={movieOption.id} index={index}>
                  {(provided) => (
                    <ListItem  
                      ref= {provided.innerRef} 
                      {...provided.draggableProps} 
                      >
                      <ListItemText primary={ movieOption.info.name } />
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
