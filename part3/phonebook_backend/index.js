require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const Person = require('./models/Person')
const app = express()

morgan.token('data', function (req, res) { return JSON.stringify(req.body) })

app.use(express.static('dist'))
app.use(express.json())
app.use(morgan(':method :url :status :res[Content-Length] :response-time ms :data'))

app.get('/api/persons', (req, res) => {
    Person.find({}).then(notes => {
      res.json(notes)
    })
})

app.get('/api/persons/:id',(req, res) => {
    const id = req.params.id
    
    Person.findById(id)
      .then(person => {
        res.json(person)
      })
      .catch(error => {
        res.send(`<h1>${id} does not exist</h1>`)
      })
})


app.delete('/api/persons/:id', (req, res) => {
    const id = req.params.id
    Person.findByIdAndDelete(id).then(result => {
      res.status(204).end()
    })
})

app.post('/api/persons', (req, res) => {
    const body = req.body

    if (!body.name || !body.number){
        res.status(400).send({ error: 'missing name or number' })
    }
    const person = new Person({
      "name": body.name, 
      "number": body.number
    })

    person.save().then(newPerson => {
      res.json(newPerson)
    })
})

app.put('/api/persons/:id', (req, res) => {
  const id = req.params.id

  const body = req.body

  if (!body.name || !body.number){
      return res.status(400).send({ error: 'missing name or number' })
  }
  const person = new Person({
    "name": body.name, 
    "number": body.number
  })

  Person.findByIdAndDelete(id)
    .then(
      person.save().then(updatedPerson => {
        res.json(updatedPerson)
      })
    )
    .catch(error => {
      res.send(`<h1>${id} does not exist</h1>`)
    })

})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`listening on port ${PORT}`)
})