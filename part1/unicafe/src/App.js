import React, { useState } from 'react'

let maxVote =0, maxVotedAnecIndex =0;

const App = () => {
  // save clicks of each button to its own state
  console.log('Hello App');
  
  const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
  ]

  const len = anecdotes.length;

  const [anec,setAnec] = useState((Math.floor(Math.random()*10))%(len));

  const[voteArr, setArr] = useState(new Array(len).fill(0));
  const copyVoteArr = [...voteArr];

  const handleOnNextClick = () =>  {
      const val = (Math.floor(Math.random()*10))%(len);
      setAnec(val);
      console.log('maxVote= ',maxVote, ' maxVoteINDEX= ',maxVotedAnecIndex);
  }

  const handleOnVoteClick = () => {
      copyVoteArr[anec] = copyVoteArr[anec]+1;

      if(maxVote<=copyVoteArr[anec])
        {
            maxVote = copyVoteArr[anec];
            maxVotedAnecIndex = anec;
        }
      setArr(copyVoteArr);
      console.log('maxVote= ',maxVote, ' maxVoteINDEX= ',maxVotedAnecIndex);
  }


  return (
      <div>
          <h2>Anecdote of the day</h2>
          <p>{anecdotes[anec]}</p>
          <button onClick={handleOnNextClick}>Next Anecdote</button>
          <button onClick={handleOnVoteClick}>Vote</button>
          <div>has {voteArr[anec]} votes</div>
          <br></br>
          <h2>Anecdote with largest no of vote</h2>
          <p>{anecdotes[maxVotedAnecIndex]}</p>
          <p>has {maxVote} votes</p>
      </div>
  )
}

export default App