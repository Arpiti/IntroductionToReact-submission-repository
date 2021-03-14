import React, { useState } from 'react'

const Statistics = (props) => {

    if( props.all === 0 )
        return <div>No feedback given </div>
    return (
        <div>
        <div>good {props.good}</div>
        <div>neutral {props.neutral}</div>
        <div>bad {props.bad}</div>
        <div>all {props.all}</div>
        <div>average {props.avg}</div>
        <div>positive {props.posPer} %</div>
        </div>
    );
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const all = bad+good+neutral;
  const avg = (good - bad)/all;
  const posPer = (good/all)*100;
  return (
    <div>
      <h1>Give Feedback</h1>
      <div>
          <button onClick={() => {setGood(good+1)}}> good </button>
          <button onClick={() => {setNeutral(neutral+1)}}> neutral </button>
          <button onClick={() => {setBad(bad+1)}}> bad </button>
      </div>
      <br></br>
      <h1>Statistics </h1> 
     <Statistics good={good} neutral={neutral} bad={bad} all={all} avg={avg} posPer={posPer}></Statistics>
    </div>
  )
}

export default App