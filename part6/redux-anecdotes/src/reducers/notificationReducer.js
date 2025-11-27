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

export const { changeMessage, removeMessage } = notificationSlice.actions
export default notificationSlice.reducer