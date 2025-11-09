const Blog = require('../models/Blog')

const BlogsinDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(blog => blog.toJSON())
}

module.exports = {
  BlogsinDb
}