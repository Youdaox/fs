const baseUrl = 'http://localhost:3001/anecdotes'

const getAll = async () => {
  const response = await fetch(baseUrl)

  if (!response.ok) {
    throw new Error('Failed to fetch all')
  }
  return await response.json()
}

const createAnecdote = async (content) => {
  const options = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json'},
    body: JSON.stringify({ content, votes: 0 })
  }

  const response = await fetch(baseUrl, options)

  if (!response.ok) {
    throw new Error('Failed to create new')
  }
  return await response.json()
}

const createVote = async (content, id, votes) => {
  const options = {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json'},
    body: JSON.stringify({ content, votes: votes})
  }
  const response = await fetch(`${baseUrl}/${id}`, options)

  if (!response.ok) {
    throw new Error('Failed to create new')
  }

  return await response.json()
}
export default { getAll, createAnecdote, createVote }