import TextInput from './TextInput'
import { useState } from 'react'

const CreateForm = ({ createBlog }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const handleCreateBlog = async (event) => {
    event.preventDefault()
    await createBlog({ title, author, url })
    setTitle('')
    setAuthor('')
    setUrl('')
  }

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={handleCreateBlog}>
        <TextInput
          text="title:"
          value={title}
          setValue={setTitle}
          data-testid="titleid"
        />
        <TextInput
          text="author:"
          value={author}
          setValue={setAuthor}
          data-testid="authorid"
        />
        <TextInput
          text="url:"
          value={url}
          setValue={setUrl}
          data-testid="urlid"
        />
        <button type="submit">create</button>
      </form>
    </div>
  )}

export default CreateForm