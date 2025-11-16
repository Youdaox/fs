import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import LoginForm from './components/LoginForm'
import CreateForm from './components/CreateForm'
import Notification from './components/Notification'

import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const [message, setMessage] = useState('')
  const [notificationType, setNotificationType] = useState(true)

  useEffect(() => {
    async function fetchdata() {
      const blogs = await blogService.getAll()
      setBlogs( blogs )
    }
    fetchdata()
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedNoteappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({ username, password })
      window.localStorage.setItem('loggedNoteappUser', JSON.stringify(user))
      blogService.setToken(user.token)
      setUser(user)
      setNotificationType(true)
      setMessage('successfully logged in')
      setTimeout(() => {
        setMessage('')
      }, 3000)
      setUsername('') 
      setPassword('')
    } catch {
      setNotificationType(false)
      setMessage('wrong credentials')
      setTimeout(() => {
        setMessage('')
      }, 3000)
    }
  }

  const handleLogout = () => {
    setUser(null)
    window.localStorage.clear()
  }

  const LoginFormProps = {
    handleLogin, 
    username, 
    setUsername, 
    password, 
    setPassword
  }

  const handleCreateBlog = async (event) => {
    event.preventDefault()

    try {
      await blogService.createBlog({title, author, url})
      setNotificationType(true)
      setMessage(`a new blog ${title} added`)
      setTimeout(() => {
        setMessage('')
      }, 3000)
      setTitle('') 
      setAuthor('')
      setUrl('')
      const blogs = await blogService.getAll()
      setBlogs(blogs)
    } catch {
      console.log('error')
    }
  }

  const CreateFormProps = {
    handleCreateBlog, 
    title, 
    setTitle, 
    author,
    setAuthor,
    url,
    setUrl
  }
  return (
    <div>
      {message && Notification(notificationType, message)}
      {!user && LoginForm(LoginFormProps)}
      {user && (
        <div>
          <h2>blogs</h2>
          <p>{user.name} logged in</p>
          <button onClick={handleLogout}>logout</button>
          {CreateForm(CreateFormProps)}
          {blogs.map(blog =>
            <Blog key={blog.id} blog={blog} />
          )}
        </div>
      )}
    </div>
  )
}

export default App