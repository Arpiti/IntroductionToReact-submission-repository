import React from 'react';

const Note = ({note, toggleImportance}) => { 

    const label = note.important ? 'mark not important':'mark important';
    return (
        <div>
           <li>{note.content}</li>
            <button onClick={toggleImportance}>{label}</button>
        </div>
    )
}

export default Note;