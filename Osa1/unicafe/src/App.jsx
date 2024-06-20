import { useState } from 'react'

// Header
const Header = ({text}) => {
  return(
  <div>
    <h1>{text}</h1>
  </div>
  )
}

// Button
const Button = ({handleClick, text}) =>{
  return(
    <button onClick={handleClick}>{text}</button>
  )
}

// Statistics
const Statistics = ({good, neutral, bad, total, average, positive}) =>{
  if(total > 0){
    return(
      <tbody> 
        <StatisticLine text='Good' value={good}/>
        <StatisticLine text='Neutral' value={neutral}/>
        <StatisticLine text='Bad' value={bad}/>
        <StatisticLine text='All' value={total}/>
        <StatisticLine text='Average' value={average}/>
        <StatisticLine text='Positive' value={`${positive} %`}/>
      </tbody> 
    )

  }
  return(
    <tbody>
      <tr>
        <td>No feedback given</td>
      </tr>
    </tbody>
  )
}

// Statistic Line
const StatisticLine = ({text, value}) =>{
  return(
    <tr>
      <td>{text}: </td>
      <td>{value}</td>
    </tr>
  )
}


const App =() => {

  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [total, setTotal] = useState(0)
  const [average, setAverage] = useState(0)
  const [positive, setPositive] = useState(0)


  const addOneToGood = () => {
    const newGood = good + 1
    const newTotal = total + 1 
    setTotal(newTotal)
    setGood(newGood)
    setAverage((newGood - bad) / newTotal) // Vähennetään bad uudesta goodista ja jaetaan se uudella totalilla.
    setPositive((newGood / newTotal) * 100) // Lasketaan uusi good ja jaetaan se uudella totalilla.
  }
  const addOneToNeutral = () =>{
    const newTotal = total + 1
    setTotal(total + 1)
    setNeutral(neutral + 1)
    setAverage((good - bad) / newTotal) // Vähennetään "vanhat" good ja bad, mutta jaetaan se uudella totalilla.
    setPositive((good / newTotal) * 100) // Lasketaan vanha good, koska goodiin ei lisätä yhtään, mutta jaetaan se uudella totalilla.
  }
  const addOneToBad = () => {
    const newBad = bad + 1
    const newTotal = total + 1
    setTotal(total + 1)
    setBad(bad + 1)
    setAverage((good - newBad) / newTotal) // vähennetään vanha good uudella badilla ja jaetaan se uudella totalilla.
    setPositive((good / newTotal) * 100) // Sama kuin addOneToNeutral.
  }

  return (
    <div>
      <Header text='Give Feedback'/>
      <Button handleClick={addOneToGood} text='Good'/>
      <Button handleClick={addOneToNeutral} text='Neutral'/>
      <Button handleClick={addOneToBad} text='Bad'/>
      <Header text='Statistic'/>
        <table>
          <Statistics 
            good={good}
            neutral={neutral}
            bad={bad}
            total={total}
            average={average}
            positive={positive}
          />
      </table>
    </div>

  )
}

export default App
