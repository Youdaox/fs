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

export default noteReducer