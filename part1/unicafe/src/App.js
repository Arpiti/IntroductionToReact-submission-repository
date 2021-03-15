import React, { useState } from 'react'

const App = () => {
  // save clicks of each button to its own state
  const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
  ]

  

  const len = anecdotes.length;
  let val = 0;

  const [anec,setAnec] = useState((Math.floor(Math.random()*10))%(len));

  const[voteArr, setArr] = useState(new Array(len).fill(0));
  const copyVoteArr = [...voteArr];


  const handleOnNextClick = () =>  {
      val = (Math.floor(Math.random()*10))%(len);
      setAnec(val);
  }

  const handleOnVoteClick = () => {
      copyVoteArr[anec] = copyVoteArr[anec]+1;
      setArr(copyVoteArr);
      console.log('anec=',anecdotes[anec],' val=',val,' copyVoteArr=',copyVoteArr, ' anec',anec);
  }

  console.log(len);
  return (
      <div>
          <h4>{anecdotes[anec]}</h4>
          <button onClick={handleOnNextClick}>Next Anecdote</button>
          <button onClick={handleOnVoteClick}>Vote</button>
          <div>has {voteArr[anec]} votes</div>
          
      </div>
  )
}

export default App