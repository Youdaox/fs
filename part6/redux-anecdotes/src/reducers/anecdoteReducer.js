import { createSlice } from '@reduxjs/toolkit'

const initialState = []

const anecdoteSlice = createSlice({ 
  name: 'anecdotes',
  initialState,
  reducers: {
    addVote(state, action) {
      const anecdoteToUpdate = state.find(anecdote => anecdote.id === action.payload)
      const updatedAnecdote = {
        content: anecdoteToUpdate.content,
        id: anecdoteToUpdate.id,
        votes: anecdoteToUpdate.votes + 1
      }
      return state.map(a => a.id !== updatedAnecdote.id ? a : updatedAnecdote)
    },
    addAnecdote(state, action) {
      state.push(action.payload)
    },
    setAnecdotes(state, action) {
      return action.payload
    }
  }})

export const { addVote, addAnecdote, setAnecdotes } = anecdoteSlice.actions
export default anecdoteSlice.reducer
