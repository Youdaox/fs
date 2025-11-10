const BlogRouter = require('express').Router()
const Blog = require('../models/Blog')

BlogRouter.get('/api/blogs', async (request, response) => {
  const blogs = await Blog.find({})
  response.json(blogs)
})

BlogRouter.post('/api/blogs', async (request, response) => {
  const body = request.body
  
  const blog = new Blog({
      title: body.title,
      author: body.author,
      url: body.url,
      likes: body.likes || 0,
  })

  const result = await blog.save()
  response.status(201).json(result)
})

BlogRouter.put('/api/blogs/:id', async (request, response) => {
  await Blog.findByIdAndDelete(request.params.id)
  const body = request.body

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes || 0,
  })

  const result = await blog.save()
  response.status(201).json(result)
})

BlogRouter.delete('/api/blogs/:id', async (request, response) => {
  await Blog.findByIdAndDelete(request.params.id)
  response.status(204).end()
})
module.exports = BlogRouter