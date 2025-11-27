import { useSelector, useDispatch } from "react-redux"
import { addVote } from '../reducers/anecdoteReducer'
import { changeMessage, removeMessage } from '../reducers/notificationReducer'

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
    if (state.filter !== '') {
      return (
        state.anecdotes.filter(a => a.content.includes(state.filter))
      ) 
    }
    return state.anecdotes
  })
  const sortedAnecdotes = [...anecdotes].sort((a,b) => (b.votes - a.votes))

  return (
    <div>
      {sortedAnecdotes.map(anecdote => (
        <Anecdote 
          key={anecdote.id}
          anecdote={anecdote}
          handleClick={() => {
            dispatch(addVote(anecdote.id))
            dispatch(changeMessage(`You voted ${anecdote.content}`))
            setTimeout(() => {
              dispatch(removeMessage())
            }, 5000)
            }
          }
        />
        ))}
    </div>
  )
}

export default AnecdoteList