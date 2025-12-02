import { useDispatch } from 'react-redux'
import { addAnecdote } from '../reducers/anecdoteReducer'
import { changeMessage, removeMessage } from '../reducers/notificationReducer'
import anecdoteService from '../services/anecdotes'

const AnecdoteForm = () => {
  const dispatch = useDispatch()

  const createNew = async event => {
    event.preventDefault()
    const content = event.target.anecdote.value
    const newAnecdote = await anecdoteService.createAnecdote(content)

    dispatch(addAnecdote(newAnecdote))
    dispatch(changeMessage(`new note ${event.target.anecdote.value} created`))
    setTimeout(() => {
      dispatch(removeMessage())
    }, 5000)
    
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