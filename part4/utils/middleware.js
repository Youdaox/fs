const jwt = require('jsonwebtoken')
const User = require('../models/User')

const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'Validation Error') {
    return response.status(400).json(error.message)
  } else if (error.name === 'MongoServerError' && error.message.includes('E11000 duplicate key error')) {
    return response.status(400).json({ error: 'expected `username` to be unique' })
  } else if (error.name === 'JsonWebTokenError') {
    return response.status(400).json({ error: 'token invalid' })
  } else if (error.name === 'TokenExpiredError') {
    return response.status(401).json({
      error: 'token expired'
    })
  }

  next(error)
}

const getToken = (request, response, next) => {
    const auth = request.get('authorization')
    if (auth && auth.startsWith('Bearer ')) {
        request["token"] = auth.replace('Bearer ', '')
    }
    next()
}

const userExtractor = async (request, response, next) => {
  const token = request.token
  console.log(token)
  const decodedToken = jwt.verify(token, process.env.SECRET)
  request['user'] = await User.findById(decodedToken.id)
  next()
}

module.exports = { 
    errorHandler,
    getToken,
    userExtractor
}