import { useState, useEffect } from 'react'
import personService from './services/persons'


// Notification
const Notification = ({message, color}) => {
  const notificationStyle = {
    color: color,
    background: 'lightgrey',
    fontSize: 20,
    borderStyle: 'solid',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10
  }
  if(message === null){
    return null
  }
  return(
    <div style={notificationStyle}>
      {message}
    </div>
  )
}


// Person
const Person = ({person, number, deleteClick}) => {
  return(
    <div>
      {person} {number} <button onClick={deleteClick}>Delete</button>
    </div>
  )
}

// Filter
const Filter = ({filtered, onChange}) => {
  return(
    <div>
    Filter shown with: <input value={filtered} onChange={onChange}/>
  </div>
  )
}

// PersonForm
const PersonForm = ({addNew, name, number, personChange, numberChange}) => {
  return(
    <form onSubmit={addNew}>
    <div>
      Name: <input value={name} onChange={personChange}/>
    </div>
    <div>
      Number: <input value={number} onChange={numberChange}/>
    </div>
    <div>
      <button type="submit">Add</button>
    </div>
  </form>
  )
}

// Numbers
const Numbers = ({list, deleteClick}) => {
  return(
    <div>
    {list.map(person => 
      <Person key={person.name} 
            person={person.name} 
            number={person.number}
            deleteClick={() => deleteClick(person.name, person.id)}/>
    )}
    </div>
)
}

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filtered, setFilter] = useState('')
  const [notificationMessage, setNotificationMessage] = useState(null)
  const [notificationColor, setNotificationColor] = useState('')

  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, [])

  // ADD
  const addPerson = (e) =>{
    e.preventDefault()
    const personObject = {
      name: newName,
      number: newNumber
    }

    // Jos henkilö löytyy, ilmoitetaan siitä käyttäjälle. Muussa tapauksessa lisätään henkilö luetteloon.
    if(persons.find(person => person.name === newName)){
      if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)){
        const person = persons.find(person => person.name === newName)
        const changedPerson= { ...person, number: newNumber}

        console.log(person)
        console.log(changedPerson)

        personService
          .update(person.id, changedPerson)
          .then(returnedPerson => {
            setPersons(persons.map(person => person.id !== changedPerson.id ? person : returnedPerson)),
            setNotificationColor('green'),
            setNotificationMessage(`Upadated number for ${person.name}`),
            console.log(`Number changed for ${person.name}`)
          })
          .catch(error => {
            setNotificationColor('red')
            setNotificationMessage(`Person '${newName}' has already been deleted from server`)
          })
          setTimeout(() => {
            setNotificationColor(''),
            setNotificationMessage(null)
          }, 5000)
      }
    }
    else{
      personService
          .createNew(personObject)
          .then(initialPersons => {
            setPersons(persons.concat(initialPersons),
            setNotificationColor('green'),
            setNotificationMessage(`Added ${personObject.name}`))
          })          
          setTimeout(() => {
            setNotificationColor(''),
            setNotificationMessage(null)
          }, 5000)
    }

    // Alustetaan tyhjäksi merkkijonoksi.
    setNewName('')
    setNewNumber('')
  }

  const handlePersonChange = (e) =>{
    console.log('handlePersonChange: ', e.target.value)
    setNewName(e.target.value)
  }

  const handleNumberChange = (e) => {
    console.log('handleNumberChange:', e.target.value)
    setNewNumber(e.target.value)
  }

  const handleFilterChange = (e) => {
    console.log('handleFilterChange:', e.target.value)
    setFilter(e.target.value)
  }

  const deletePerson = (name, id) => {
    if (window.confirm(`Delete ${name}?`)) {
      personService
        .deletePerson(id)
        .then(
          setPersons(persons.filter(person => person.id !== id)),
          setNotificationColor('green'),
          setNotificationMessage(`Deleted ${name}`),
          console.log(`Deleted: ${name}`)
        )
        setTimeout(() => {
          setNotificationColor(''),
          setNotificationMessage(null)
        }, 5000)
        
    }

  }

  // Jos kenttä on tyhjä, näytetään kaikki, muulloin näytetään filtteröity lista.
  // Käytetään toLowerCase() metodia, jotta isot kirjaimet eivät sotke filtteröintiä.
  const showPersons = filtered === ''
  ? persons
  : persons.filter(person=> person.name.toLowerCase().includes(filtered.toLowerCase()))

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification 
        message={notificationMessage} 
        color={notificationColor}/>
      <Filter filtered={filtered} onChange={handleFilterChange}/>
      <h2>Add a new</h2>
      <PersonForm addNew={addPerson}
                  name={newName}
                  number={newNumber}
                  personChange={handlePersonChange}
                  numberChange={handleNumberChange}
/>
      <h2>Numbers</h2>
      <Numbers list={showPersons}              
               deleteClick={deletePerson}/>
    </div>
  )
}

export default App
