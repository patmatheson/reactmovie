import { getDatabase, ref, remove, set, get, onValue, child } from "firebase/database";
import { app } from "../firebase";
import { useList, useListVals, useObjectVal } from 'react-firebase-hooks/database';
import { MovieRank } from './VotingList';
import { Movie } from "@mui/icons-material";
import { MovieOption } from "../moviePanel/MoviePanel";
import { prependOnceListener } from "process";
import getMovieName, { getMovieList } from "../movieName";
import { Ballot } from "votes";
import VoteTally from "../voting";

interface iVotes{
    [key:string]: MovieRank[]
}

export async function voteSubmit(): Promise<any> {
    const db = getDatabase(app);
    const votesRef = ref(db, `votes`);
    /*
    const dbVotes = await onValue(ref(db, `votes`), (snapshot) => {
        votes = (snapshot.val());
    });*/
    const votesSnapshot = await get(votesRef);
    const votes = <iVotes>votesSnapshot.val();

    console.log(`votes: ${votes}`)
    let ballots: Ballot[] = [];
    let userIndex = 0;
    for (let [user, entries] of Object.entries(votes)){
        let voteList: string[][] = [];
        console.log(`user: ${user}`);
        for (let movieRank of Object.entries(entries)){
            
            console.log(`Rank: ${movieRank[0]}`);
            console.log(`Movie: ${movieRank[1].movieUuid}`);

            console.log(`MovieName: ${getMovieName(movieRank[1].movieUuid)}`)
            
            voteList.push([movieRank[1].movieUuid]);
        }
        console.log(voteList);
        const userBallot: Ballot = {
            ranking: voteList,
            weight: 1
        }
        ballots.push(userBallot)
        userIndex++;
    }
    console.log(ballots);
    console.log(`Vote Tally:${VoteTally(getMovieList(), ballots)}`);
}