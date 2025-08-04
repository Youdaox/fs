require('dotenv').config()
const express = require('express')
const app = express()
const Note = require('./models/note')

app.use(express.static('dist'))
app.use(express.json())

app.get('/', (req, res) => {
  res.send('<h1>notes backend</h1>')
})

app.get('/api/notes', (req,res) => {
    Note.find({}).then(notes => {
      res.json(notes)
    })
})

app.get('/api/notes/:id', (req, res) => {
    const id = req.params.id
    Note.findById(id).then(returnedNote => {
      res.json(returnedNote)
    })
})

app.delete('/api/notes/:id', (req, res) => {
    const id = req.params.id
    Note.findByIdAndDelete(id).then(res.status(204).end())
})

app.post('/api/notes', (req, res) => {
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

app.put('/api/notes/:id', (req, res) => {
  const id = req.params.id
  
  const body = req.body

  const note = new Note({
    content: body.content,
    important: body.important || false,
  })

  Note.findByIdAndDelete(id).then(
    note.save().then(savedNote => {
      res.json(savedNote)
    })
  )
})
const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint)
const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log(`server running on ${PORT}`)
})

