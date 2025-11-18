import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import LoginForm from './components/LoginForm'
import CreateForm from './components/CreateForm'
import Notification from './components/Notification'
import Togglable from './components/Togglabe'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

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

  const handleCreateBlog = async (blog) => {
    try {
      await blogService.createBlog(blog)
      createFormRef.current.toggle()
      setNotificationType(true)
      setMessage(`a new blog ${blog.title} added`)
      setTimeout(() => {
          setMessage('')
      }, 3000)
      const blogs = await blogService.getAll()
      setBlogs(blogs)
    } catch {
      setNotificationType(false)
      setMessage('cannot add blog')
      setTimeout(() => {
          setMessage('')
      }, 3000)
    }
  }

  const handleUpdateBlog = async (blog, id) => {
    try {
      await blogService.updateBlog(blog, id)
      setNotificationType(true)
      setMessage(`blog ${blog.title} updated`)
      setTimeout(() => {
          setMessage('')
      }, 3000)
      const blogs = await blogService.getAll()
      setBlogs(blogs)
    } catch {
      setNotificationType(false)
      setMessage('cannot update blog')
      setTimeout(() => {
          setMessage('')
      }, 3000)
    }
  }

  const createFormRef = useRef()
  const createForm = () => (
    <Togglable buttonText="create blog" ref={createFormRef}>
      <CreateForm
        createBlog={handleCreateBlog}
      />
    </Togglable>
  )

  const handleDeleteBlog = async (blog) => {
    const blogToDelete = blog
    await blogService.deleteBlog(blog.id)
    const newBlogs = blogs.filter(b => (b !== blogToDelete))
    setBlogs(newBlogs)
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
            {createForm()}
          {blogs.sort((a, b) => b.likes - a.likes).map(blog => {
            return (
              <Blog 
                key={blog.id} 
                blog={blog} 
                updateBlog={handleUpdateBlog} 
                ownBlog={blog.user.username == user.username ? true : false}
                deleteBlog={handleDeleteBlog}
              />
            )
          }
          )}
        </div>
      )}
    </div>
  )
}

export default App