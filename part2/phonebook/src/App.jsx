import { useState , useEffect } from 'react'
import services from './services/services'
import PersonForm from './components/PersonForm'
import Filter from './components/Filter'
import Persons from './components/Persons'
import Notification from './components/Notification'

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [phoneNumber, setPhoneNumber] = useState('')
  const [search, setSearch] = useState('')
  const [message, setMessage] = useState(null)
  const [error, setError] = useState(null)
  useEffect(() => {
    services.getAll().then(data => {
      setPersons(data)
    })
  },[])

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

  const confirmDelete = (person) => {
    if (window.confirm(`Delete ${person.name}?`)){
      handleDelete(person.id)
    }
  }
  const handleDelete = (id) => {
    services.deletePerson(id).then(data => {
      console.log(data)
      setPersons(persons.filter(person => person.id !== id))
      }
    )
  }

  const handleClick = (e) => {
    e.preventDefault()
    if (persons.some(person => person.name === newName)){
      if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)){
        const person = persons.find(p => p.name === newName)
        const updatedPerson = {...person, number: phoneNumber}

        services.update( person.id, updatedPerson).then(data => {
          setPersons(persons.map(p => p.id === updatedPerson.id ? data : p))
          setNewName('')
          setPhoneNumber('')
          setMessage(`updated phone number for ${newName}`)
          setTimeout(() => setMessage(null), 3000)
        }).catch(() => {
          setNewName('')
          setPhoneNumber('')
          setError(`the person '${newName}' was already deleted from server`)
          setTimeout(() => setError(null), 3000)
          setPersons(persons.filter(p => p.id !== person.id))
        })
      }
    } else{
      addPerson()
    }
  }

  const addPerson = () => {
    const person = {name: newName, number: phoneNumber}
    services.create(person)
    .then(newPerson => {
      setPersons(persons.concat(newPerson))
      setNewName('')
      setPhoneNumber('')
      setMessage(`added ${newName}`)
      setTimeout(() => setMessage(null), 3000)
    })
    .catch(error => {
      setError(error.response.data)
      setTimeout(() => setError(null), 3000)
    })
  }
  const peopleToShow = persons.filter(person => 
    person.name.toLowerCase().includes(search.toLowerCase()))
  
  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message} className='message'/>
      <Notification message={error} className='error'/>
      <Filter search={search} onChange={handleSearch}/>
      <h2>Add a new</h2>
      <PersonForm handleClick={handleClick} 
        newName={newName} 
        phoneNumber={phoneNumber} 
        handleChange={handleChange} 
        handlePhoneNumber={handlePhoneNumber} 
      />
      <h2>Numbers</h2>
      <Persons peopleToShow={peopleToShow} confirmDelete={confirmDelete}/>
    </div>
  )
}
export default App