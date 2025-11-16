const Persons = ({peopleToShow, confirmDelete}) => {
  return (
    peopleToShow.map(person => 
      <p key={person.name}>{person.name} {person.number} 
      <button onClick={() => confirmDelete(person)}> delete</button> 
      </p> 
    )
  )
}

export default Persons