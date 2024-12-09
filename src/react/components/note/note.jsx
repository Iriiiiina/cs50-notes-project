import React from 'react';

export const Note = (props) => {
  const { note, onDeleteNote } = props;

  return (
    <div>
      <p>{note.text}</p>
      <button onClick={() => onDeleteNote(note.timestamp)}>delete</button>
    </div>
  );
};
