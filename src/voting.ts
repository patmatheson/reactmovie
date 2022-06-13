import { Borda } from 'votes'

interface iVotes {
    candidates: string[],
    ballots: [
        {ranking: string[][], weight: number}
    ];
}

export default function VoteTally (votes: iVotes){
    const tally = new  Borda({
        candidates: votes.candidates,
        ballots: votes.ballots
    })

    console.log(`Tally Complete, Results: ${tally.scores}`);

    return tally.ranking();
}