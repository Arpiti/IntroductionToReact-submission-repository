import React, { useState, useEffect } from 'react'
import Note from './components/Note';
import axios from 'axios'; 

const App = () => { 
  
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState('');
  const [showAll, setShowAll] = useState(true);

  useEffect(() => {  
      console.log('effect');  
      axios      
        .get('http://localhost:3001/notes')
        .then(response => {  
                console.log('promise fulfilled');
                setNotes(response.data);
                })
  }, []);
        
  console.log('render', notes.length, 'notes');

  const addNote = (event) => {   
     event.preventDefault();
     let nn = {
      content: newNote,
      date: new Date().toISOString(),
      important: Math.random() < 0.5,
      id: notes.length + 1,
     }
     setNotes(notes.concat(nn));
     setNewNote('');
     //console.log('nn ', nn.content) ;
     }

    const handleOnChange = (event) => {
      console.log('onChange', event.target) ;
      console.log('input value', event.target.value) ;
      setNewNote(event.target.value);
      console.log('newN', newNote) ;
    }

    console.log('before entering return');

  return (
    <div>
      <h1>Notes</h1>
      <ul>
        {notes.map(note => 
          <Note key={note.id} note={note} />
        )}
      </ul>
      <form onSubmit={addNote}>     
        <input value={newNote} onChange={handleOnChange}/>  
        <button type="submit">save</button> 
        </form> 
    </div>
  )
}

export default App;


