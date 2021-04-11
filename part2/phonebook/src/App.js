import React, { useState, useEffect } from 'react'
import personService from './services/persons';

let arr = [];

const Filter = ({ filter, handleFilterInputChange }) => {
  return (
    <div>
      filter shown with: <input type='text' onChange={handleFilterInputChange} value={filter} />
    </div>
  )
}


const Persons = ({ persons, setPersons }) => {

 const handleDeleteOnClick = (id) => {

  let res = window.confirm('Are you sure, you want to delete the contact');

  if(res) {
      personService
    .remove(id)
    .then(() => {
      personService
        .getAll()
        .then(personList => setPersons(personList));
    });
  }
}

  return (
    <ul>
      {
        persons.map((person,i) => <li key={i}>{person.name} {person.number} <button onClick={() => handleDeleteOnClick(person.id)}>Delete</button></li>)
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

  console.log('In App() >> start');
  const [persons, setPersons] = useState([])

  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('');

  const [notif, setNotification] = useState('');

  useEffect(()=>{
    console.log('In useEffect');

    personService
      .getAll()
      .then( allPersons => setPersons(allPersons));
    
  },[]);

  console.log('After useEffect');

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

  let id = -1;

  const isSamePerson = (sum, person) => {
    console.log('person name', person.name);
    console.log('new name', newName);
    console.log('new number', newNumber);

    if (((person.name).localeCompare(newName)===0) && ((person.number).localeCompare(newNumber))===0) {
      sum = 1;
      console.log('same names bro >>');
    }
    else if((person.name).localeCompare(newName)===0)
     {
        sum = -1;
        id = person.id;
     } 
    return sum;
  }

  const handleFormSubmit = (event) => {
    event.preventDefault();
    console.log('Submit handled');

    const newPerson = { name: newName, number: newNumber };
    const flagSum = persons.reduce(isSamePerson, 0);

    console.log('flagsum= ', flagSum);

    if (flagSum === 0) {
      arr = persons.concat(newPerson);
      
      personService
        .create(newPerson)
        .then(output => {
          setPersons(persons.concat(output))
          setNotification(newName);
          setTimeout(() => {
            setNotification(null)
          }, 3000);

        })
    }
    else if(flagSum === -1) {
      if(window.confirm(`${newName} is already added to phonebook`))
      {
        personService
          .update(id, newPerson)
          .then(addedPerson => {
            console.log('id of same person >> ', id);
            setPersons(persons.map(person => (person.id != id) ? person : addedPerson))
          })
      }
    }
    else
      window.alert(`${newName} is already added to phonebook`);

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
      <Notification newName={notif}/>
      <Filter filter={filter} handleFilterInputChange={handleFilterInputChange} />
      <br />
      <h2>Add new</h2>
      <Form handleFormSubmit={handleFormSubmit} handleNameInputChange={handleNameInputChange}
        newName={newName} handleNumberInputChange={handleNumberInputChange} newNumber={newNumber} />
      <h2>Numbers</h2>
      <Persons persons={persons} setPersons={setPersons} />
    </div>
  )
}

const Notification = ({newName}) => {
  if(newName === undefined || newName === '' || newName === null)
    return null;
  return <div className='notification'>Added {newName}</div>
    
}

export default App