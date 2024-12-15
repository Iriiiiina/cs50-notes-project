import React, { useState } from 'react';

import "./search.css";

export const Search = (props) => {
  const { onSearch, userNotes } = props;
  const [searchQuery, setSearchQuery] = useState('');

  const onInput = (event) => {
    setSearchQuery(event.target.value.toLowerCase());

    const inputValue = event.target.value.toLowerCase();
    if (!inputValue) {
      onSearch(userNotes);
    }

    const filteredNotes = userNotes.filter(item => {
      if (item.title?.toLowerCase().includes(inputValue) ||  item.text?.toLowerCase().includes(inputValue) || item.url?.toLowerCase().includes(inputValue)) {
        return item;
      }
    })

    onSearch(filteredNotes);
  }

  return (
    <div className="search-notes">
      <input type="text" className="form-control" placeholder="Search..." value={searchQuery} onChange={onInput}/>
    </div>
  );
};
