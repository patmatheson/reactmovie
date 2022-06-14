import { getDatabase, onValue, ref } from "firebase/database";
import { app } from "./firebase";
import { MovieOption } from "./moviePanel/MoviePanel";


export default function getMovieName(movieUuid: string): string {
    const db = getDatabase(app);
    
    const movieRef = ref(db, 'movies');
    let movies: any[] = [];
    const dbmovies = onValue(movieRef, (snapshot) => {
        const theseMovies = (snapshot && snapshot.val()) || `no movies`;
        for (let movieInfo of Object.entries(theseMovies)){
            movies.push(movieInfo[1]);
        }
        console.log(`MovieUpdate: ${snapshot}`);
    });

    if(movies){
        const movieMatches = movies?.filter(m => m.id == movieUuid);
        if (movieMatches.length>0){
            //console.log(`MovieName: ${movieMatches[0].info.name}`);
            return movieMatches[0].info.name;
        }
    }
    
    return ``;
}

export function getMovieInfo(movieUuid: string): MovieOption | null {
    const db = getDatabase(app);
    
    const movieRef = ref(db, 'movies');
    let movies: any[] = [];
    const dbmovies = onValue(movieRef, (snapshot) => {
        const theseMovies = (snapshot && snapshot.val()) || `no movies`;
        for (let movieInfo of Object.entries(theseMovies)){
            movies.push(movieInfo[1]);
        }
        console.log(`MovieUpdate: ${snapshot}`);
    });

    if(movies){
        const movieMatches = movies?.filter(m => m.id == movieUuid);
        if (movieMatches.length>0){
            //console.log(`MovieName: ${movieMatches[0].info.name}`);
            return movieMatches[0];
        }
    }

    return null;
}

export function getMovieList(): string[]{
    const db = getDatabase(app);
    
    const movieRef = ref(db, 'movies');
    let movielist: any[] = [];
    const dbmovies = onValue(movieRef, (snapshot) => {
        const theseMovies = (snapshot && snapshot.val()) || `no movies`;
        for (let movieInfo of Object.entries(theseMovies)){
            movielist.push(movieInfo[0]);
        }
    });

    return movielist;
}