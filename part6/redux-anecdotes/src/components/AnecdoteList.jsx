import { useSelector, useDispatch } from "react-redux"
import { addVote } from '../reducers/anecdoteReducer'

const Anecdote = ({anecdote, handleClick }) => {
  return (
    <div>
      <div>{anecdote.content}</div>
      <div>
        has {anecdote.votes}
        <button onClick={handleClick}>vote</button>
      </div>
    </div>
  )
}

const AnecdoteList = () => {
  const dispatch = useDispatch()
  const anecdotes = useSelector((state) => {
    console.log(state)
    if (state.filter !== '') {
      return (
        state.anecdotes.filter(a => a.content.includes(state.filter))
      ) 
    }
    return state.anecdotes
  })

  return (
    <div>
      {anecdotes.sort((a,b) => b.votes - a.votes).map(anecdote => (
      <Anecdote 
        key={anecdote.id}
        anecdote={anecdote}
        handleClick={() => dispatch(addVote(anecdote.id))}
      />
      ))}
    </div>
  )
}

export default AnecdoteList