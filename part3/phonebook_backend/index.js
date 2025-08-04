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
    .catch(error => next(error))
})

app.get('/api/persons/:id',(req, res, next) => {
    const id = req.params.id
    
    Person.findById(id)
      .then(person => {
        if (!person) {
          return res.status(404).end()
        }
        res.json(person)
      })
      .catch(error => next(error))
})


app.delete('/api/persons/:id', (req, res, next) => {
    const id = req.params.id
    Person.findByIdAndDelete(id).then(result => {
      res.status(204).end()
    })
    .catch(error => next(error))
})

app.post('/api/persons', (req, res, next) => {
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
    .catch(error => next(error))
})

app.put('/api/persons/:id', (req, res, next) => {
  const id = req.params.id

  const body = req.body

  if (!body.name || !body.number){
      return res.status(400).send({ error: 'missing name or number' })
  }

  Person.findById(id)
    .then(result => {
      if (!result){
        return res.status(404).end()
      }
      result.name = body.name
      result.number = body.number
      result.save()
        .then(updatedPerson => {
          res.json(updatedPerson)
        })
    })
    .catch(error => next(error))

})

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
    console.log(`listening on port ${PORT}`)
})