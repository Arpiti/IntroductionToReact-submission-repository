import React, { useState } from 'react'
import Note from './components/Note'

const App = (props) => {
  
  const [notes, setNotes] = useState(props.notes);
  const [newNote, setNewNote] = useState('a new note...') 

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


