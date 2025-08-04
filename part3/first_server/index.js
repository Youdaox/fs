require('dotenv').config()
const express = require('express')
const app = express()
const Note = require('./models/note')

app.use(express.static('dist'))
app.use(express.json())

app.get('/', (req, res) => {
  res.send('<h1>notes backend</h1>')
})

app.get('/api/notes', (req, res) => {
    Note.find({}).then(notes => {
      res.json(notes)
    })
})

app.get('/api/notes/:id', (req, res, next) => {
    const id = req.params.id
    Note.findById(id)
    .then(returnedNote => {
      if (returnedNote){
        res.json(returnedNote)
      } else {
        res.status(404).end()
      }
    })
    .catch(error => next(error))
})

app.delete('/api/notes/:id', (req, res, next) => {
    const id = req.params.id
    Note.findByIdAndDelete(id)
    .then(result => {
      res.status(204).end()
    })
    .catch(error => next(error))
})

app.post('/api/notes', (req, res, next) => {
  const body = req.body

  if (!body.content) {
    return res.status(400).json({error: 'content-missing'})
  }
  const note = new Note({
    content: body.content,
    important: body.important || false,
  })
  
  note.save().then(savedNote => {
    res.json(savedNote)
  })
})

app.put('/api/notes/:id', (req, res, next) => {
  const id = req.params.id
  
  const body = req.body

  Note.findById(id)
  .then(note => {
    if (!note) {
      return res.status(404).end()
    } 
    note.content = body.content
    note.important = body.important

    return note.save().then(updatedNote => {
      res.json(updatedNote)
    })
  })
  .catch(error => next(error))
})

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint)

const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  } 

  next(error)
}
app.use(errorHandler)

const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log(`server running on ${PORT}`)
})

