import React, { useState, useEffect } from 'react'
import Note from './components/Note';
import noteService from './services/notes'


const App = () => {

  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState('');
  const [showAll, setShowAll] = useState(true);
  const [errorMessage, setErrorMessage] = useState('some error happened...')

  useEffect(() => {
    console.log('effect');
    noteService
      .getAll()
      .then(output => {
        console.log('promise fulfilled');
        setNotes(output);
      })
  }, []);

  const Footer = () => {
    const footerStyle = {
      color: 'green',
      fontStyle: 'italic',
      fontSize: 16
    }

    return (
      <div style={footerStyle}>
        <br />
        <em>Note app, Department of Computer Science, University of Helsinki 2021</em>
      </div>
    )
  }

  const toggleImportanceOf = id => {
    const note = notes.find(n => n.id === id)
    const changedNote = { ...note, important: !note.important }

    noteService
      .update(changedNote).then(returnedNote => {
        setNotes(notes.map(note => note.id !== id ? note : returnedNote))
      })
      .catch(error => {
        setErrorMessage(`Note '${note.content}' was already removed from server`);
        setTimeout(() => { setErrorMessage(null) }, 5000);
        setNotes(notes.filter(n => n.id !== id));
      })
  }

  //  console.log('render', notes.length, 'notes');

  const addNote = (event) => {

    event.preventDefault();

    let nn = {
      content: newNote,
      date: new Date().toISOString(),
      important: Math.random() < 0.5,
      // id: notes.length + 1,
    }

    noteService
      .create(nn)
      .then(output => {
        console.log('RESPONSE >>', output);
        setNotes(notes.concat(output));
        setNewNote('');
      })
  }

  const handleOnChange = (event) => {
    console.log('onChange', event.target);
    console.log('input value', event.target.value);
    setNewNote(event.target.value);
    console.log('newN', newNote);
  }

  const Notification = ({ message }) => {
    if (message === null) {
      return null
    }

    return (
      <div className="error">
        {message}
      </div>
    )
  }

  return (
    <div>
      <h1>Notes</h1>
      <Notification message={errorMessage} />
      <div>
        <button onClick={() => setShowAll(!showAll)}>
          show {showAll ? 'important' : 'all'}
        </button>
      </div>
      <ul>
        {
          notes.map((note, i) =>
            <Note
              key={i}
              note={note}
              toggleImportance={() => toggleImportanceOf(note.id)} />
          )}
      </ul>
      <form onSubmit={addNote}>
        <input value={newNote} onChange={handleOnChange} />
        <button type="submit">save</button>
      </form>
      <Footer/>
    </div>
  )
}

export default App;


