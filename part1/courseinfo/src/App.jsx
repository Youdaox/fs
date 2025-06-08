import { useState } from 'react'

const Heading = (props) => (
  <h1> {props.text} </h1>
)

const Display = (props) => (
  <div> {props.text} {props.state}</div>
)

const Button = (props) => (
  <button onClick={props.onClick}> {props.text}</button>
)

const Statistics = ({good,bad,neutral}) => {
  if (good + bad + neutral == 0){
    return (
      <div>No feedback given</div>
    )
  }
  return (
  <>
  <Display text ="good" state ={good}/>
  <Display text ="neutral" state ={neutral}/>
  <Display text ="bad" state ={bad}/>
  <Display text ="all" state ={good + bad + neutral}/>
  <Display text ="average" state ={good + bad + neutral / 3}/>
  <Display text ="positive" state ={good / (good + bad + neutral) * 100 + " %"}/>
  </>
  )
}
const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <>
      <Heading text="give feedback" />
      <Button onClick={() => setGood(good +1)} text="good" />
      <Button onClick={() => setNeutral(neutral +1)}text="neutral" />
      <Button onClick={() => setBad(bad +1)}text="bad" />
      <Heading text="statistics" />
      <Statistics good={good} bad={bad} neutral={neutral}/>
    </>
  )
}

export default App