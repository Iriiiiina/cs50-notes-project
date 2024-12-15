import React, { useEffect, useState } from 'react';

import "./App.css";

import { Note } from './note/note';
import { Autosave } from './autosave/autosave';
import { Search } from './search/search';

const App = () => {
  const [userNotes, setUserNotes] = useState([]);
  const [filteredNotes, setFilteredNotes] = useState([]);
  const [showMenu, setShowMenu] = useState(false);

  useEffect(() => {
    setFilteredNotes(userNotes);
  }, [userNotes])

  useEffect(() => {
    chrome.runtime?.onMessage.addListener((message) => {
      if (message.action === "highlightSaved") {
        loadNotes()
      }
    });

    loadNotes()
  }, []);

  const handleDeleteNote = (timestamp) => {
    chrome.storage?.local.set(
      {
        notes: userNotes.filter((note) => note.timestamp !== timestamp)
      },
      () => {
        loadNotes();
      }
    );
  }

  const saveNote = (note) => {
    const noteIndex = userNotes.findIndex(item => item.timestamp === note.timestamp);
    const newNotes = Array.from(userNotes);
    newNotes[noteIndex] = note;

    chrome.storage?.local.set(
      {
        notes: newNotes
      },
      () => {
        loadNotes();
      }
    );
  }

  const loadNotes = () => {
    chrome.storage?.local.get(["notes"], (result) => {
      const notes = result.notes || [];

      setUserNotes(notes);
    });
  }

  const handleUserNotesFilter = (filteredNotes) => {
    setFilteredNotes(filteredNotes);
  }

  const changeMenuState = () => {
    setShowMenu(!showMenu)
  }

  return (
    <main className="main">
      <div className="header">
        <h1>My saved notes</h1>
        <button type="button" class="btn btn-sm btn-outline-primary" onClick={changeMenuState}>Menu</button>
      </div>
      <div className={`menu ${showMenu ? 'shown' : ''}`}>
        <Autosave />
        <Search onSearch={handleUserNotesFilter} userNotes={userNotes} />
      </div>
      <div className='notes-list'>
        {
          filteredNotes?.length ?
            filteredNotes?.map((item) => <Note key={item.timestamp} note={item} onDeleteNote={handleDeleteNote} onSaveNote={saveNote} />) : 'No notes'
        }
      </div>
    </main>
  );
};
export default App;
