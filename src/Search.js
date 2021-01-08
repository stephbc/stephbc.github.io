import React, { useState } from 'react';
import { SearchResults } from './SearchResults'

export const Search = () => {
  const [text, setText] = useState('');
  const [movies, setMovies] = useState([]);

  const fetchMovies = async (text) => {
    if(text.length < 3) {
      alert("please enter valid movie title")
    } else {
      try {
        await fetch(`http://www.omdbapi.com/?s=${text}&apikey=51fbba34`)
        .then(response => response.json())
        .then(data => setMovies(data.Search));
        setText("")
      } catch (error) {
        console.error(error)
      }
    }
  }

  const handleKey = event => {
    if (event.key === 'Enter') {
      fetchMovies(text)
    }
  }

  if(movies.length) {
    return (
      <div>
        <div className="Search-Bar">
          <input
            type="text"
            placeholder="next title"
            value={text}
            onChange={(event) => setText(event.target.value)}
            onKeyDown={evt => handleKey(evt)}
          />
          <button onClick={() => fetchMovies(text)}>GO!</button>
        </div>
        <SearchResults movies={movies} />
      </div>
    )
  } else {
    return (
      <div>
        <div className="Search-Bar">
          <input
            type="text"
            placeholder="search by title"
            value={text}
            onChange={(event) => setText(event.target.value)}
            onKeyDown={evt => handleKey(evt)}
          />
          <button type="submit" onClick={() => fetchMovies(text)}>GO!</button>
        </div>
      </div>
    )
  }
}
