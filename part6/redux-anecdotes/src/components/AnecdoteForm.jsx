import { useDispatch } from 'react-redux'
import { addAnecdote } from '../reducers/anecdoteReducer'
import { changeMessage, removeMessage } from '../reducers/notificationReducer'

const AnecdoteForm = () => {
  const dispatch = useDispatch()

  const createNew = event => {
    event.preventDefault()
    dispatch(addAnecdote(event.target.anecdote.value))
    dispatch(changeMessage(`new note ${event.target.anecdote.value} created`))
    setTimeout(() => {
      dispatch(removeMessage())
    }, 3000)
    
    event.target.anecdote.value = ''
  }
  return (
    <>
      <h2>create new</h2>
      <form onSubmit={createNew}>
        <div>
          <input name='anecdote'/>
        </div>
        <button>create</button>
      </form>
    </>
  )
}

export default AnecdoteForm