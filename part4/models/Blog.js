const mongoose = require('mongoose')

const blogSchema = mongoose.Schema({
  id: String,
  title: { 
    type: String,
    required: true
  },
  author: String,
  url: { 
    type: String,
    required: true
  },
  likes: Number,
})

const Blog = mongoose.model('Blog', blogSchema)

blogSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = Blog
