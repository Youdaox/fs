const { test, after, describe, beforeEach} = require('node:test')
const assert = require('node:assert')
const helper = require('./test_helper')
const supertest = require('supertest')
const mongoose = require('mongoose')
const app = require('../app')
const Blog = require('../models/Blog')
const User = require('../models/User')

const api = supertest(app)

beforeEach(async () => {
  await Blog.deleteMany({})
  await User.deleteMany({})
  const initialBlogs = [
    { title: 'Blog 1', author: 'Author 1', url: 't', likes: 5 },
    { title: 'Blog 2', author: 'Author 2', url: 's', likes: 10 },
  ]
  await Blog.insertMany(initialBlogs)
})


test('returns all blogs', async () => {
    const blogs = await api.get('/api/blogs')
    

    assert.strictEqual(blogs.body.length, 2)
})

test('unique identifier property is named id', async () => {
  const blogs = await api.get('/api/blogs')
  const blog = blogs.body[0]

  assert(blog['id'])
})

test('successfully creates a new blog post', async () => {
  const initialBlogs = await Blog.find({})
  const blog = 
    {
      title: 'test post',
      author: 'john',
      url: 'link',
      likes: 5,
    }
  

  await api.post('/api/blogs')
    .send(blog)
    .expect(201)
    .expect('Content-Type', /application\/json/)
  
  const endBlogs = await Blog.find({})

  assert.strictEqual(initialBlogs.length + 1, (endBlogs.length))
})

test('verifies the likes property is in request', async () => {
  const blog = 
    {
      title: 'test post',
      author: 'john',
      url: 'link',
    }

  await api.post('/api/blogs')
    .send(blog)
    .expect(201)
    .expect('Content-Type', /application\/json/)
  
  const fetchedBlog = await Blog.find(blog)
  assert.strictEqual(fetchedBlog[0]['likes'], 0)
})

test('verifies the title or url properties is in request', async () => {
  const blog = 
    {
      author: 'john',
      url: 'link',
      likes: 5
    }
  const blog1 = 
    {
      title: 'test post2',
      author: 'john',
      likes: 5
    }
  await api.post('/api/blogs')
    .send(blog)
    .expect(500)

  await api.post('/api/blogs')
    .send(blog1)
    .expect(500)
})

test('blog post can be deleted', async () => {
  let blogs = await Blog.find({})
  blogs = blogs.map(blog => blog.toJSON())
  const blogToDelete = blogs[0]

  await api.delete(`/api/blogs/${blogToDelete.id}`)
    .expect(204)

  const endBlogs = await Blog.find({})

  assert.strictEqual(blogs.length -1 , endBlogs.length)
})

test('blog post can be updated', async () => {
  let blogs = await Blog.find({})
  blogs = blogs.map(blog => blog.toJSON())
  const blogToUpdate = blogs[0]

  const updatedBlog = {
    title: "third blog",
    author: "ryanl",
    url: "http://localhost:3003/api/blogs",
    likes: 3,
}
  await api.put(`/api/blogs/${blogToUpdate.id}`)
    .send(updatedBlog)
    .expect(201)

  let endBlogs = await Blog.find({})
  endBlogs = endBlogs.map(b => b.toJSON())
  
  
  assert.strictEqual(endBlogs[1].likes, updatedBlog.likes)
})

test('users with an invalid password are not created', async () => {
  const initialUsers  = await User.find({})
  const user = 
    {
      name: 'test post',
      username: 'john'
    }

  const user1 = 
    {
      name: 'test post',
      username: 'john',
      password: 'ab'
    }

  const result = await api.post('/api/users')
    .send(user)
    .expect(400)
  
  await api.post('/api/users')
    .send(user1)
    .expect(400)

  const endUsers = await User.find({})
  assert(result.body.error.includes('password missing or too short'))
  assert.strictEqual(initialUsers.length, (endUsers.length))
})
test('users with the same username are not created', async () => {
  const initialUsers  = await User.find({})
  const user = 
    {
      name: 'test post',
      username: 'john',
      password: 'abc'
    }


  await api.post('/api/users')
    .send(user)
    .expect(201)
  
  const result = await api.post('/api/users')
    .send(user)
    .expect(400)

  const endUsers = await User.find({})
  assert(result.body.error.includes('expected `username` to be unique'))
  assert.strictEqual(endUsers.length, 1)
})
after(async () => {
  await mongoose.connection.close()
})