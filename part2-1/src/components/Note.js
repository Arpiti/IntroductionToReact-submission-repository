import React from 'react';

const Note = ({note, toggleImportance}) => { 

    const label = note.important ? 'mark not important':'mark important';
    return (
        <div>
           <li className='note'>{note.content} <button onClick={toggleImportance}>{label}</button></li> 
        </div>
    )
}

export default Note;