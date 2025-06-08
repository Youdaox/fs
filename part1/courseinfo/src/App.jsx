import { useState } from 'react'

const Heading = (props) => (
  <h1> {props.text} </h1>
)

const StatisticLine = (props) => (
  <tr>
    <td>{props.text}</td> 
    <td>{props.value}</td>
  </tr>
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
  <table>
    <tbody>
      <StatisticLine text ="good" value ={good}/>
      <StatisticLine text ="neutral" value ={neutral}/>
      <StatisticLine text ="bad" value ={bad}/>
      <StatisticLine text ="all" value ={good + bad + neutral}/>
      <StatisticLine text ="average" value ={good + bad + neutral / 3}/>
      <StatisticLine text ="positive" value ={good / (good + bad + neutral) * 100 + " %"}/>
    </tbody>
  </table>
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