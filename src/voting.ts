import { Ballot, Borda } from 'votes'

interface iVotes {
    candidates: string[],
    ballots: [
        {ranking: string[][], weight: number}
    ];
}

export default function VoteTally (candidates: string[], ballots: Ballot[]){
    const tally = new  Borda({
        candidates: candidates,
        ballots: ballots
    })

    const scores = tally.scores();
    console.log(scores);


    return tally.ranking();
}