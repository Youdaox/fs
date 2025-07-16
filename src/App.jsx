import { useState } from 'react'
const Filter = (props) => {

  return (
  <div>
    filter shown with <input value={props.search} onChange={props.onChange} />
  </div>
  )
}

const PersonForm = (props) => {
    return (
      <form>
        <div>
          name: <input value={props.newName} onChange={props.handleChange}/>
        </div>
        <div>
          number: <input value={props.phoneNumber} onChange={props.handlePhoneNumber}/></div>
        <div>
          <button type="submit" onClick={props.handleClick}>add</button>
        </div>
      </form>
    )
}
const Persons = ({peopleToShow}) => peopleToShow.map(person => <p key={person.name}>{person.name} {person.number}</p>)
const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ]) 
  const [newName, setNewName] = useState('')
  const [phoneNumber, setPhoneNumber] = useState('')
  const [search, setSearch] = useState('')

  const handleSearch = (e) => {
    console.log(e.target.value);
    setSearch(e.target.value)
  }

  const handlePhoneNumber = (e) => {
    console.log(e.target.value);
    setPhoneNumber(e.target.value)
  }

  const handleChange = (e) => {
    console.log(e.target.value);
    setNewName(e.target.value)
  }

  const handleClick = (e) => {
    e.preventDefault()
    if (persons.some(person => person.name === newName)){
      alert(`${newName} is already added to phonebook`)
      console.log("dfsdf")
    } else{
      const person = {name: newName, number: phoneNumber}
      setPersons(persons.concat(person))
      setNewName('')
    }
  }
  const peopleToShow = persons.filter(person => person.name.toLowerCase().includes(search.toLowerCase()))
  return (
    <div>
      <h2>Phonebook</h2>
      <Filter search={search} onChange={handleSearch}/>
      <h2>Add a new</h2>
      <PersonForm handleClick={handleClick} newName={newName} phoneNumber={phoneNumber} handleChange={handleChange} handlePhoneNumber={handlePhoneNumber} />
      <h2>Numbers</h2>
      <Persons peopleToShow={peopleToShow}/>
    </div>
  )
}

export default App