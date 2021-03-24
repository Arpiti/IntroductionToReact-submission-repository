import React, { useState } from 'react'
let c = 1;

const App = () => {
  

  const [ persons, setPersons ] = useState([{name: 'Arto Hellas'}]) ;
  const [ newName, setNewName ] = useState('')

  const handleFormSubmit = (event) => {
    event.preventDefault();
    console.log('Submit handled');
    
    const newPerson = {name: newName};
    setPersons(persons.concat(newPerson));
    setNewName('');
 }

  const handleInputChange = (event) => { 
    //event.preventDefault;
    console.log('Input Change handled- ',event.target.value);
    setNewName(event.target.value);
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={handleFormSubmit}>
        <div>
          name: <input onChange={handleInputChange} value={newName}/> 
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <ul>
      {persons.map(person=> <li key={person.name}>{person.name}</li>)}
      </ul>
    </div>
  )
}

export default App