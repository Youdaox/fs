const mongoose = require('mongoose')

const login = async (password) => {
  const url = `mongodb+srv://youdao:${password}@cluster0.woqbz63.mongodb.net/phonebookApp?retryWrites=true&w=majority&appName=Cluster0`

  mongoose.set('strictQuery',false)

  await mongoose.connect(url)
}

const createPerson = (name, number) => {
  const personSchema = new mongoose.Schema({
    name: String,
    number: String,
  })

  const Person = mongoose.model('Person', personSchema)

  const person = new Person({
    'name': name,
    'number': number,
  })

  person.save().then(res => {
    console.log(res)
    mongoose.connection.close()
  })
}

const printAll = async () => {
  const personSchema = new mongoose.Schema({
    name: String,
    number: String,
    id: String
  })

  const Person = mongoose.model('Person', personSchema)

  Person.find({}).then(res => {
    console.log('phonebook:')
    res.forEach(person => {
      console.log(person.name, person.number)
    })
    mongoose.connection.close()
  })
}

if (process.argv.length < 3) {
  console.log('give password as argument')
  process.exit(1)
} else if (process.argv.length < 4) {
  login(process.argv[2])
  printAll()
} else if (process.argv.length < 5) {
  console.log('missing name or number as argument')
} else {
  login(process.argv[2])
  createPerson(process.argv[3], process.argv[4])
}