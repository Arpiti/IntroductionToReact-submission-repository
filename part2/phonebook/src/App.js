import React, { useState } from 'react'

const App = () => {
  

  const [ persons, setPersons ] = useState([{name: 'Arto Hellas'}]) ;
  const [ newName, setNewName ] = useState('Text here')

  const isSamePerson = (sum, person) => {
    console.log('person name', person.name);
    console.log('new name', newName);
    if(person.name == newName)
    {
      console.log('in if condition');
      sum =1;
    }
    return sum;
  }

  const handleFormSubmit = (event) => {
    event.preventDefault();
    console.log('Submit handled');
    
    const newPerson = {name: newName};
    const flagSum = persons.reduce(isSamePerson, 0)
    let realPerson = [...persons];

    console.log('flagsum= ', flagSum);

    if(flagSum === 0)
      realPerson = persons.concat(newPerson);
    else
       window.alert(`${newName} is already added to phonebook`);  
    
    console.log('real ', realPerson);
    setPersons(realPerson);
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