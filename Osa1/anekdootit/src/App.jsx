import { useState } from 'react'

// Button
const Button = ({text, handleClick}) =>{
  return(
    <button onClick={handleClick}>{text}</button>
  )
}

// Votes
const Votes = ({votes}) => {
  return(
    <div>
      <p>Has {votes} votes.</p>
    </div>
  )

}

// Header
const Header = ({text}) => {
  return(
    <h1>{text}</h1>
  )
}

// Statistic
const Statistic = ({anecdote, votes}) => {
  if(votes === 0){
    return(
      <div>
        <p>No votes given</p>
      </div>
    )
  }
  return(
    <div>
    <p>{anecdote}</p>
    <Votes votes={votes}/>
    </div>
  )
}

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when dianosing patients.',
    'The only way to go fast, is to go well.'
  ]
   
  const [selected, setSelected] = useState(0)
  const [points, setPoints ] = useState(new Array(anecdotes.length).fill(0))
  const [mostVotedAnecdote, setMostVotedAnecdote] = useState(0)


  // Parametri max = maksimi numeroiden määrä. Jos 8, niin numerot 0 - 7.
  const RandomNumberGenerator = (max) =>{
    return Math.floor(Math.random() * max);
  }

  const NextAnecdote = () =>{
    let number = RandomNumberGenerator(anecdotes.length)
    console.log(number)
    setSelected(number)

  }

  const Vote = () =>{
    console.log('Vote given to number:', selected)
    const copyOfPoints = [...points]
    copyOfPoints[selected] += 1

    console.log(copyOfPoints)
    setPoints(copyOfPoints)

    // Tarkistetaan äänet ja tehdään tarvittavat muutokset
    MostVoted(copyOfPoints)

  }

  const MostVoted = (votes) => {
    if(votes[selected] > votes[mostVotedAnecdote]) {
      setMostVotedAnecdote(selected)
      console.log("Most voted anecdote:", mostVotedAnecdote)
    }
  }

  return (
    <div>
      <Header text="Anecdote of the day"/>
      {anecdotes[selected]}
      <Votes votes={points[selected]}/>
        <div>
          <Button text="Vote" handleClick={Vote}/>
          <Button text="Next Anecdote" handleClick={NextAnecdote}/>
      </div>
      <Header text="Anecdote with most votes"/>
      <Statistic anecdote={anecdotes[mostVotedAnecdote]} votes={points[mostVotedAnecdote]}/>
    </div>

  )
}

export default App
