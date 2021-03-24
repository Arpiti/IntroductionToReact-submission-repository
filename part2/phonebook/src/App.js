import React, { useState } from 'react'

const App = () => {
  

  const [ persons, setPersons ] = useState([{name: 'Arto Hellas', number: '040-1234567'}]) ;
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')

  const isSamePerson = (sum, person) => {
    console.log('person name', person.name);
    console.log('new name', newName);
    console.log('new number', newNumber);

    if(person.name == newName && person.newNumber == newNumber)
    {
      sum =1;
    }
    return sum;
  }

  const handleFormSubmit = (event) => {
    event.preventDefault();
    console.log('Submit handled');
    
    const newPerson = {name: newName, number: newNumber};
    const flagSum = persons.reduce(isSamePerson, 0)
    let realPerson = [...persons];

    console.log('flagsum= ', flagSum);

    if(flagSum === 0)
      realPerson = persons.concat(newPerson);
    else
       window.alert(`${newName} is already added to phonebook`);  
    
    console.log('real ', realPerson);
    setPersons(realPerson);
    setNewNumber()
    setNewName('');
 }

  const handleNameInputChange = (event) => { 
    //event.preventDefault;
    console.log('Input Change handled- ', event.target.value);
    setNewName(event.target.value);
  }

  const handleNumberInputChange = (event) => { 
    //event.preventDefault;
    console.log('Input Change handled- ', event.target.value);
    setNewNumber(event.target.value);
  }


  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={handleFormSubmit}>
        <div>
          name: <input onChange={handleNameInputChange} value={newName}/> 
        </div>
        <div>
          number: <input onChange={handleNumberInputChange} value={newNumber}/> 
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <ul>
      {persons.map(person=> <li key={person.name}>{person.name} {person.number}</li>)}
      </ul>
    </div>
  )
}

export default App