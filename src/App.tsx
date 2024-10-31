import React, { useState } from 'react';

import './App.css';
import { MovieDetail, MovieSummary } from './types/MovieData';
import axios from 'axios';
import MovieCard from './components/MovieCard';

function App() {

  const [query, setQuery] = useState('');
  const [searchResults, setSearchResults] = useState<MovieSummary[]>([]);
  const [selectedMovie, setSelectedMovie] = useState<MovieDetail | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Search for Movies (handleSearch):
  // Fetches a list of movies matching the search query by calling the s endpoint.
  // If the search is successful, it populates searchResults with the list of MovieSummary objects.
  const handleSearch = async () => {
    setError(null);
    try {
      const response = await axios.get(`https://www.omdbapi.com/?apikey=c7c651f6&s=${query}`);
      if (response.data.Search) {
        setSearchResults(response.data.Search);
        setSelectedMovie(null);
      } else {
        setError("No movies found");
      }
    } catch (error) {
      setError("Error occurred while searching for movies");
    }
  };

  //   Display Movie Details (handleSelectMovie):
  // When a user clicks on a movie card, it fetches full details about that movie using the i endpoint.
  // The selectedMovie state is populated with the movie’s details, triggering the detailed view.
  const handleSelectedMovie = async (imdbID: string) => {
    try {
      const response = await axios.get(`https://www.omdbapi.com/?apikey=c7c651f6&i=${imdbID}`);
      setSelectedMovie(response.data);
    } catch (error) {
      setError("Failder to fetch movie detials");
    }
  };

  // Conditional Rendering:
  // If selectedMovie is set, a detailed view of the movie is displayed.
  // Otherwise, the app displays the search results list.
  return (
    <div className="App">
      <h1>Movie Explorer</h1>
      <input type="text" value={query} onChange={(e) => setQuery(e.target.value)}
        placeholder='Search for a movie'
      />

      <button onClick={handleSearch}>Search</button>
      {error && <p style={{ color: 'red' }}>{error}</p>}


      <div className="movie-container">
        {selectedMovie ? (
          // Detailed view of single movie
          <div className="movie-details">
            <h2>{selectedMovie.Title} ({selectedMovie.Year})</h2>
            <img src={selectedMovie.Poster} alt={selectedMovie.Title} />
            <p> <strong>Genre: </strong>{selectedMovie.Genre}</p>
            <p> <strong>Director: </strong>{selectedMovie.Director}</p>
            <p> <strong>Actors: </strong>{selectedMovie.Actors}</p>
            <p> <strong>Plot: </strong>{selectedMovie.Plot}</p>
            <button onClick={() => setSelectedMovie(null)}>Back to Results</button>
          </div>
        ) : (
          // list of search results as Movie Cards
          searchResults.map((movie) => (
            <MovieCard
              key={movie.imdbID}
              title={movie.Title}
              year={movie.Year}
              poster={movie.Poster}
              onClick={() => handleSelectedMovie(movie.imdbID)}
            />
          ))
        )}
      </div>

    </div>
  );
}

export default App;
