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
  const blog = { title: 'Blog 1', author: 'Author 1', url: 't', likes: 5 }
  
  await api.post('/api/users').send({
      name: 'firstuser',
      username: 'firstuser',
      password: 'testpass'
    })
  const login = await api.post('/api/login')
  .send({
    username: 'firstuser',
    password: 'testpass'
  })

  await api.post('/api/blogs')
    .send(blog)
    .set('authorization', 'Bearer ' + login.body.token)
  
})


test('returns all blogs', async () => {
    const blogs = await api.get('/api/blogs')
    

    assert.strictEqual(blogs.body.length, 1)
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

  const login = await api.post('/api/login')
  .send({
    username: 'firstuser',
    password: 'testpass'
  })

  await api.post('/api/blogs')
    .send(blog)
    .set('authorization', 'Bearer ' + login.body.token)
    .expect(201)
    .expect('Content-Type', /application\/json/)
  
  const endBlogs = await Blog.find({})

  assert.strictEqual(initialBlogs.length + 1, (endBlogs.length))
})

test('verifies new blog post fails when token is missing', async () => {
  const blog = 
    {
      title: 'test post',
      author: 'john',
      url: 'link',
      likes: 5,
    }

  const login = await api.post('/api/login')
  .send({
    username: 'firstuser',
    password: 'testpass'
  })

  await api.post('/api/blogs')
    .send(blog)
    .set('authorization', '')
    .expect(401)
    .expect('Content-Type', /application\/json/)
  
})

test('verifies the likes property is in request', async () => {
  const blog = 
    {
      title: 'test post',
      author: 'john',
      url: 'link',
    }

  const login = await api.post('/api/login')
  .send({
    username: 'firstuser',
    password: 'testpass'
  })

  await api.post('/api/blogs')
    .send(blog)
    .set('authorization', 'Bearer ' + login.body.token)
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
  const login = await api.post('/api/login')
  .send({
    username: 'firstuser',
    password: 'testpass'
  })
  
  await api.post('/api/blogs')
    .send(blog)
    .set('authorization', 'Bearer ' + login.body.token)
    .expect(500)

  await api.post('/api/blogs')
    .send(blog1)
    .set('authorization', 'Bearer ' + login.body.token)
    .expect(500)
})

test('blog post can be deleted', async () => {
  let blogs = await Blog.find({})
  blogs = blogs.map(blog => blog.toJSON())
  const blogToDelete = blogs[0]

  const login = await api.post('/api/login')
  .send({
    username: 'firstuser',
    password: 'testpass'
  })

  await api.delete(`/api/blogs/${blogToDelete.id}`)
    .set('authorization', 'Bearer ' + login.body.token)
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

  const login = await api.post('/api/login')
  .send({
    username: 'firstuser',
    password: 'testpass'
  })

  await api.put(`/api/blogs/${blogToUpdate.id}`)
    .send(updatedBlog)
    .set('authorization', 'Bearer ' + login.body.token)
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
  assert.strictEqual(endUsers.length, 2)
})
after(async () => {
  await mongoose.connection.close()
})