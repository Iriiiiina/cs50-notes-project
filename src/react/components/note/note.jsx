import React, { useState } from 'react';

import "./note.css";

export const Note = (props) => {
  const { note, onDeleteNote, onSaveNote } = props;
  const [isEditMode, setEditMode] = useState(false);
  const [noteText, setNoteText] = useState(note?.text);

  const noteDate = new Date(note?.timestamp);

  const copyNote = () => {
    navigator.clipboard.writeText(noteText);
  }

  const deleteNote = () => {
    if (confirm("Are you sure you want to delete note?")) {
      onDeleteNote(note?.timestamp)
    }
  }

  const handleNoteChange = (event) => {
    setNoteText(event.target.value);
  }

  const cancelEditing = () => {
    setNoteText(setNoteText)
    setEditMode(false);
  }
  const saveEditing = () => {
    onSaveNote(note);
    setEditMode(false);
  }

  return (
    <div className='note'>
      <div className="note-title">
        <a href={note?.url} target="_blank">{note?.title}</a>
        <p title={noteDate.toLocaleString()}>{noteDate?.toLocaleDateString()}</p>
      </div>
      <div className={'note-body' + isEditMode ? 'edit-mode' : 'view-mode'}>
        {isEditMode ? (
          <textarea name={note?.timestamp} id={note?.timestamp} value={noteText} onChange={handleNoteChange}></textarea>
        ) : (
          <p>{noteText}</p>
        )}
      </div>
      <div className="note-footer">
        {isEditMode ? (
          <>
            <button className="btn btn-sm btn-outline-primary" onClick={cancelEditing}>Cancel</button>
            <button className="btn btn-sm btn-outline-primary" onClick={saveEditing}>Save</button>
          </>
        ) : (
          <>
            <button className="btn btn-sm btn-outline-danger" onClick={deleteNote}>Delete</button>
            <button className="btn btn-sm btn-outline-info" onClick={copyNote}>Copy</button>
            <button className="btn btn-sm btn-outline-primary" onClick={() => setEditMode(true)}>Edit</button>
          </>
        )}
      </div>
    </div >
  );
};
