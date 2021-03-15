import React, { useState } from 'react'

const Statistics = (props) => {

    if( props.all === 0 )
        return <div>No feedback given </div>
    return (
        <div>
        <Statistic text='good' value={props.good} ></Statistic>
        <Statistic text='neutral' value={props.neutral} ></Statistic>
        <Statistic text='bad' value={props.bad} ></Statistic>
        <Statistic text='all' value={props.all} ></Statistic>
        <Statistic text='average' value={props.avg} ></Statistic>
        <Statistic text='positive' value={props.posPer} ></Statistic>
        </div>
    );
}

const Statistic = (props) => {
    return(
        <div>{props.text} {props.value}</div>
    )
}

const Button = (props) => {
    return (
        <button onClick = {props.handleClick}>{props.text}</button>
    );
}


const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleGoodClick = () => setGood(good+1);
  const handleNeutralClick = () => setNeutral(neutral+1);
  const handleBadClick = () => setBad(bad+1);

  const all = bad+good+neutral;
  const avg = (good - bad)/all;
  const posPer = (good/all)*100;
  return (
    <div>
      <h1>Give Feedback</h1>
      <div>
          <Button text='good' handleClick={handleGoodClick}></Button>
          <Button text='neutral' handleClick={handleNeutralClick}></Button>
          <Button text='bad' handleClick={handleBadClick}></Button>
      </div>
      <br></br>
      <h1>Statistic </h1> 
     <Statistics good={good} neutral={neutral} bad={bad} all={all} avg={avg} posPer={posPer}></Statistics>
    </div>
  )
}

export default App