import React, { useEffect, useState } from 'react';

import "./App.css";

import { Note } from './note/note'

const App = () => {
  const [userNotes, setUserNotes] = useState(null);

  useEffect(() => {
    chrome.runtime.onMessage.addListener((message) => {
      if (message.action === "highlightSaved") {
        loadNotes()
      }
    });

    loadNotes()
  }, []);

  const handleDeleteNote = (timestamp) => {
    chrome.storage.local.set(
      {
        notes: userNotes.filter((note) => note.timestamp !== timestamp)
      },
      () => {
        loadNotes();
      }
    );
  }

  const loadNotes = () => {
    chrome.storage.local.get(["notes"], (result) => {
      const notes = result.notes || [];

      setUserNotes(notes)
    });
  }

  return (
    <main className="main">
      <h1>Add User Contact to Page</h1>
      <div>
        {userNotes?.length}
        {userNotes?.map((item) => <Note note={item} onDeleteNote={handleDeleteNote} />)}
      </div>
    </main>
  );
};
export default App;
