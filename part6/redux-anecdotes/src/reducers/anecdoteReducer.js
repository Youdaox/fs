import anecdoteService from '../services/anecdotes'
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

const { setAnecdotes, addAnecdote, addVote } = anecdoteSlice.actions

export const initializeAnecdotes = () => {
  return async (dispatch) => {
    const anecdotes = await anecdoteService.getAll()
    dispatch(setAnecdotes(anecdotes))
  }
}

export const createAnecdote = (content) => {
  return async (dispatch) => {
    const newAnecdote = await anecdoteService.createAnecdote(content)
    dispatch(addAnecdote(newAnecdote))
  }
}

export const appendVote = (anecdote) => {
  return async (dispatch) => {
    await anecdoteService.createVote(anecdote.content, anecdote.id, anecdote.votes + 1)
    dispatch(addVote(anecdote.id))
  }
}

export default anecdoteSlice.reducer
