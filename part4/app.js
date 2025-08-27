const express = require('express')
const mongoose = require('mongoose')
const config = require('./utils/config')
const BlogRouter = require('./controllers/blog')
const logger = require('./utils/logger')
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

module.exports = app