import React, { useState } from 'react'
let arr = [
  { name: 'Arto Hellas', number: '040-123456' },
  { name: 'Ada Lovelace', number: '39-44-5323523' },
  { name: 'Dan Abramov', number: '12-43-234345' },
  { name: 'Mary Poppendieck', number: '39-23-6423122' }
];

const Filter = ({ filter, handleFilterInputChange }) => {
  return (
    <div>
      filter shown with: <input type='text' onChange={handleFilterInputChange} value={filter} />
    </div>
  )
}

const Persons = ({ persons }) => {
  return (
    <ul>
      {
        persons.map(person => <li key={person.name}>{person.name} {person.number}</li>)
        //persons.filter(person => (((person.name).indexOf(filter))!=-1))    
      }
    </ul>
  )
}

const Form = ({ handleFormSubmit, handleNameInputChange, newName, handleNumberInputChange, newNumber }) => {

  return (
    <form onSubmit={handleFormSubmit}>
      <div>
        name: <input onChange={handleNameInputChange} value={newName} />
      </div>
      <div>
        number: <input onChange={handleNumberInputChange} value={newNumber} />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  );
}


const App = () => {
  const [persons, setPersons] = useState(arr)

  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('');

  let finArr = [...arr];

  const handleFilterInputChange = (event) => {
    console.log(event.target.value);

    event.preventDefault();
    let val = event.target.value;


    if (val == '' || val === 'underfined') {
      console.log('val', val);
      setFilter(val);
      console.log('finArr', finArr);
      setPersons(finArr);
    }
    else {
      setFilter(val);
      var filt = persons.filter(person => {
        console.log('filter', val);
        if (((person.name).startsWith(val))) {
          return true;
        }
        return false;
      })
      setPersons(filt);
    }
    console.log('filt', filt);

  }

  const isSamePerson = (sum, person) => {
    console.log('person name', person.name);
    console.log('new name', newName);
    console.log('new number', newNumber);

    if ((person.name).localeCompare(newName) && (person.number).localeCompare(newNumber)) {
      sum = 1;
      console.log('same names bro >>');
    }
    return sum;
  }

  const handleFormSubmit = (event) => {
    event.preventDefault();
    console.log('Submit handled');

    const newPerson = { name: newName, number: newNumber };
    const flagSum = persons.reduce(isSamePerson, 0)
    let realPerson = [...persons];


    console.log('flagsum= ', flagSum);

    if (flagSum === 0) {
      realPerson = persons.concat(newPerson);
      arr = persons.concat(newPerson);
    }
    else
      window.alert(`${newName} is already added to phonebook`);

    console.log('real ', realPerson);
    setPersons(realPerson);
    setNewNumber('');
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
      <Filter filter={filter} handleFilterInputChange={handleFilterInputChange} />
      <br />
      <h2>Add new</h2>
      <Form handleFormSubmit={handleFormSubmit} handleNameInputChange={handleNameInputChange}
        newName={newName} handleNumberInputChange={handleNumberInputChange} newNumber={newNumber} />
      <h2>Numbers</h2>
      <Persons persons={persons} />
    </div>
  )
}



export default App