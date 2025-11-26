const filterReducer = (state='', action={}) => {
  switch (action.type) {
    case 'FILTER':
      return action.payload.text
    default:
      return state
  }
}

export const filterBy = (text) => {
  return {
    type: 'FILTER',
    payload: {
      text: text
    }
  }
}

export default filterReducer