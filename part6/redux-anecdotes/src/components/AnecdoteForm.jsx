import { useDispatch } from 'react-redux'
import { addAnecdote } from '../reducers/anecdoteReducer'

const AnecdoteForm = () => {
  const dispatch = useDispatch()

  const createNew = event => {
    event.preventDefault()
    dispatch(addAnecdote(event.target.anecdote.value))
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