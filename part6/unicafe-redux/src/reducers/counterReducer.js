const initialState = {
  good: 0,
  ok: 0,
  bad: 0
}

const counterReducer = (state = initialState, action) => {
  console.log(action)
  switch (action.type) {
    case 'GOOD':{
      const updatedState = {
        good: state.good +1,
        ok: state.ok,
        bad: state.bad
      }
      return updatedState
    }
    case 'OK':{
      const updatedState = {
        good: state.good,
        ok: state.ok+1,
        bad: state.bad
      }
      return updatedState
    }
    case 'BAD':{
      const updatedState = {
        good: state.good,
        ok: state.ok,
        bad: state.bad+1
      }
      return updatedState
    }
    case 'RESET':
      return initialState
    default:
      return state
  }
}

export default counterReducer
