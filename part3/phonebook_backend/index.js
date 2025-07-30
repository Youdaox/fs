const express = require('express')
const morgan = require('morgan')
const app = express()

morgan.token('data', function (req, res) { return JSON.stringify(req.body) })

app.use(express.json())
app.use(morgan(':method :url :status :res[Content-Length] :response-time ms :data'))

let persons = [
    { 
      "id": "1",
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": "2",
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": "3",
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": "4",
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]

const generateId = () => {
    return Math.floor(Math.random() * 1000)
}

app.get('/api/persons', (req, res) => {
    res.json(persons)
})

app.get('/api/persons/:id',(req, res) => {
    const id = req.params.id
    const person = persons.find(p => p.id === id)

    if (!person) {
        res.status(404).end()
    }
    res.json(person)
})

app.get('/info', (req, res) => {
    res.send(`<p>Phonebook has info for ${notes.length} people</p><p>${Date()}</p>`)
})

app.delete('/api/persons/:id', (req, res) => {
    const id = req.params.id
    persons = persons.filter(p => p.id !== id)

    res.status(204).end()
})

app.post('/api/persons', (req, res) => {
    const body = req.body

    if (!body.name || !body.number){
        return res.status(400).send({ error: 'missing name or number' })
    }
    const person = {
      "id": generateId(),
      "name": body.name, 
      "number": body.number
    }
    if (persons.some(p => p.name === body.name)){
        return res.status(400).send({ error: '${body.name} already added to phonebook'})
    }
    persons = persons.concat(person)
    res.status(200).end()
})

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint)

const PORT = 3001
app.listen(PORT, () => {
    console.log(`listening on port ${PORT}`)
})