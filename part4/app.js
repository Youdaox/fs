const express = require('express')
const mongoose = require('mongoose')
const config = require('./utils/config')
const logger = require('./utils/logger')
const middleware = require('./utils/middleware')

const BlogRouter = require('./controllers/blog')
const userRouter = require('./controllers/user')
const app = express()

mongoose
  .connect(config.MONGODB_URI)
  .then(() => {
    logger.info('connected to MongoDB')
  })
  .catch((error) => {
    logger.error('error connection to MongoDB:', error.message)
  })
  
app.use(express.json())

app.use('', BlogRouter)
app.use('/api/users', userRouter)

app.use(middleware.errorHandler)

module.exports = app