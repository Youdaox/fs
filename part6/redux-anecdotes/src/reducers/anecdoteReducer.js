const anecdotesAtStart = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

const getId = () => (100000 * Math.random()).toFixed(0)

const asObject = anecdote => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0
  }
}

const initialState = anecdotesAtStart.map(asObject)

const anecdoteReducer = (state=initialState, action) => {
  switch (action.type) {
    case 'ADD_VOTE': {
      const anecdoteToUpdate = state.find(anecdote => anecdote.id === action.payload.id)
      const updatedAnecdote = {
        content: anecdoteToUpdate.content,
        id: anecdoteToUpdate.id,
        votes: anecdoteToUpdate.votes + 1
      }
      return state.map(a => a.id !== updatedAnecdote.id ? a : updatedAnecdote)
    }
    case 'ADD_ANECDOTE': {
      return [...state, action.payload]
    }
    default:
      return state
  }
}
export const addVote = (id) => {
  return {
    type: 'ADD_VOTE',
    payload: {
      id
    }
  }
}

export const addAnecdote = (content) => {
  return {
    type: 'ADD_ANECDOTE',
    payload: {
      content: content,
      id: getId(),
      votes: 0
    }
  }
}

export default anecdoteReducer
