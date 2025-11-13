const userRouter = require('express').Router()
const User = require('../models/User')
const bcrypt = require('bcryptjs')

userRouter.post('/', async (request, response) => {
    const { blogs, name, username, password } = request.body

    if (!password || password.length <= 2) {
        response.status(400).json({ error: 'password missing or too short' })
    }
  
    const saltRounds = 10
    const passwordHash = await bcrypt.hash(password, saltRounds)

    const user = new User({
        blogs,
        name,
        username,
        passwordHash
    })

    const savedUser = await user.save()
    response.status(201).json(savedUser)
})

userRouter.get('/', async (request, response) => {
    const users = await User.find({}).populate('blogs', { title: 1, author: 1, url: 1})

    response.json(users)
})

module.exports = userRouter