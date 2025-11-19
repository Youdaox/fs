import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = (newToken) => {
  token = `Bearer ${newToken}`
}

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const createBlog = async (blog) => {
  const config = {
    headers: { Authorization: token }
  }
  const response = await axios.post(baseUrl, blog, config)
  return response.data
}

const updateBlog = async (blog, id) => {
  const config = {
    headers: { Authorization: token }
  }
  const response = await axios.put(`${baseUrl}/${id}`, blog, config)
  return response.data
}

const deleteBlog = async (id) => {
  const config = {
    headers: { Authorization: token }
  }
  const response = axios.delete(`${baseUrl}/${id}`, config)
  return response.data
}

export default { getAll, createBlog, setToken, updateBlog, deleteBlog }