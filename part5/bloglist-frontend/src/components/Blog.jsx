import { useState } from 'react'

const Blog = ({ blog, updateBlog, ownBlog, deleteBlog }) => {
  const [visible, setVisible] = useState(false)

  const addLike = async () => {
    const updatedBlog = {
      title: blog.title,
      author: blog.author,
      url: blog.url,
      likes: blog.likes +1,
      user: blog.user
    }
    await updateBlog(updatedBlog, blog.id)
  }
  const handleDelete = async () => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
      await deleteBlog(blog)
    }
  }
  const handleView = () => {
    return (
      <div>
        <div>
          <p>{blog.title}
            <button onClick={() => setVisible(false)}> hide </button>
          </p>
          <p>{blog.url}</p>
          <p>{blog.author}</p>
          <p>likes {blog.likes}
            <button onClick={addLike}> like </button>
          </p>
        </div>
        {ownBlog && <button onClick={handleDelete}>delete</button>}
      </div>
    )
  }

  return (
    <div>
      <div className="blog">
        {blog.title} {blog.author}
        <button className="blogView" onClick={() => setVisible(true)}> view </button>
      </div>
      <div className="blogDetail">
        {visible && handleView()}
      </div>
    </div>
  )}

export default Blog