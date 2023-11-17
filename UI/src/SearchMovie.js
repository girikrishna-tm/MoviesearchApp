import React, { useState, useEffect } from 'react';
import MovieCard from './MovieCard';
import axios from 'axios';
import './MovieSearch.css'; 

export default function SearchMovie() {
  const [query, setQuery] = useState('');
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const searchMovies = async () => {
    if (loading || !hasMore) return;

    const url = `http://localhost:3001/search`;

    try {
      setLoading(true);
      console.log('Query and Page:', query, page);
      const res = await axios.post(url,{ query, page });
      const data = res?.data;

      if (data.results.length === 0) {
        setHasMore(false);
        return;
      }

      setMovies((prevMovies) => [...prevMovies, ...data.results]);
      setPage((prevPage) => prevPage + 1);

      if (data.results.length < 20) {
        setHasMore(false);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleLoadMore = () => {
    searchMovies();
  };

  const handleSearch = (e) => {
    e.preventDefault();
    setMovies([]);
    setPage(1);
    setHasMore(true);
    searchMovies();
  };

  return (
    <>
      <form className="form" onSubmit={handleSearch}>
        <label className="label" htmlFor="query">
          Movie Name:
        </label>
        <input
          className="input"
          type="text"
          name="query"
          placeholder="search a movie"
          value={query}
          onChange={(e) => {
            setHasMore(true)
            setPage(1);
            setQuery(e.target.value)
          }}
        />
        <button className="button" disabled={loading}>
          {loading ? 'Loading...' : 'Search'}
        </button>
      </form>
      <div className="card-list">
        {movies.map((movie) => (
          <MovieCard movie={movie} key={movie.id} />
        ))}
        
       
      </div>
      {loading && <p>Loading...</p>}
      {!loading && hasMore && movies.length > 0 && (
          <button className="load-more-button" onClick={handleLoadMore}>
            Load More
          </button>
        )}
        {!loading && !hasMore && !<p>No more movies</p>}
    </>
  );
}
