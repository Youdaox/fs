const BlogRouter = require('express').Router()
const Blog = require('../models/Blog')
const User = require('../models/User')
const jwt = require('jsonwebtoken')
const middleware = require('../utils/middleware')

BlogRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', { name: 1, username: 1})
  response.json(blogs)
})

BlogRouter.post('/', middleware.userExtractor, async (request, response) => {
  const body = request.body
  const user = request.user

  if (!user) {
    return response.status(401).json({ error: 'userId missing or not valid' })
  }

  const blog = new Blog({
      title: body.title,
      author: body.author,
      user: user._id,
      url: body.url,
      likes: body.likes || 0,
  })

  const result = await blog.save()
  user.blogs = user.blogs.concat(result._id)
  await user.save()
  response.status(201).json(result)
})

BlogRouter.put('/:id', middleware.userExtractor, async (request, response) => {
  const user = request.user

  if (!user) {
    return response.status(401).json({ error: 'userId missing or not valid' })
  }
  const blog = await Blog.findById(request.params.id)

  if (!(blog.user.toString() === user.id.toString())) {
    return response.status(401).json({ error: 'not authorized' })
  }
  const body = request.body

  const updatedBlog = new Blog({
    title: body.title,
    author: body.author,
    user: user._id,
    url: body.url,
    likes: body.likes || 0,
  })

  const result = await updatedBlog.save()
  response.status(201).json(result)
})

BlogRouter.delete('/:id', middleware.userExtractor, async (request, response) => {
  const user = request.user

  if (!user) {
    return response.status(401).json({ error: 'invalid token' })
  }
  const blog = await Blog.findById(request.params.id)

  if (!(blog.user.toString() === user.id.toString())) {
    return response.status(401).json({ error: 'only the author can delete' })
  }
  await Blog.findByIdAndDelete(request.params.id)
  response.status(204).end()
})
module.exports = BlogRouter