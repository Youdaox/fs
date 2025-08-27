const BlogRouter = require('express').Router()
const Blog = require('../models/Blog')

BlogRouter.get('/api/blogs', (request, response) => {
  Blog.find({}).then((blogs) => {
    response.json(blogs)
  })
})

BlogRouter.post('/api/blogs', (request, response) => {
  const body = request.body
  console.log(request.body)
  const blog = new Blog({
      title: body.title,
      author: body.author,
      url: body.url,
      likes: body.likes,
  })

  blog.save().then((result) => {
    response.status(201).json(result)
  })
})

module.exports = BlogRouter