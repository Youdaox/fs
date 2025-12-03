import { createSlice } from '@reduxjs/toolkit'

const initialState = 'initial message'

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    changeMessage(state, action) {
      return action.payload
    },
    removeMessage() {
      return ''
    }
  }
})

const { changeMessage, removeMessage } = notificationSlice.actions

export const setNotification = (message, time) => {
  return async (dispatch) => {
    dispatch(changeMessage(message))
    setTimeout(() => {
      dispatch(removeMessage())
    }, time)
  }
}

export default notificationSlice.reducer