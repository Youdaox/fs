const noteReducer = (state = [], action) => {
  switch (action.type) {
    case 'NEW_NOTE':
      return [...state, action.payload]
    case 'TOGGLE_IMPORTANCE': {
      const note = state.find((n) => n.id === action.payload.id)
      const changedNote = {
        ...note,
        important: !note.important
      }
      return state.map(note => note.id !== action.payload.id ? note : changedNote)
    }
    default:
      return state
  }
}

const generateId = () => Number((Math.random() * 1000000).toFixed(0))

export const createNote = (content) => {
  return {
    type: 'NEW_NOTE',
    payload: {
      content: content,
      important: false,
      id: generateId()
    }
  }
}

export const toggleImportanceOf = id => {
  return {
    type: 'TOGGLE_IMPORTANCE',
    payload: {
      id
    }
  }}

export default noteReducer