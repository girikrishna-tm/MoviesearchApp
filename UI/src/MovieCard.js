
import React, { useState } from 'react';

export default function MovieCard({ movie }) {
  const [isHovered, setIsHovered] = useState(false);
  return (
    <div  className={`movie-card ${isHovered ? 'hovered' : ''}`} key={movie.id}
           onMouseEnter={() => setIsHovered(true)}
           onMouseLeave={() => setIsHovered(false)}>
      <img
        className="movie-image"
        src={`https://image.tmdb.org/t/p/w185_and_h278_bestv2/${movie.poster_path}`}
        alt={movie.title + ' poster'}
      />
      <div className="movie-details">
        <h3 className="movie-title">{movie.title}</h3>
        <p>
          <small><span className="movie-release-date">RELEASE DATE:</span> {movie.release_date}</small>
        </p>
        <p>
          <small><span className='movie-rating'>RATING:</span> {movie.vote_average}</small>
        </p>
        <p className="movie-desc">{movie.overview}</p>
      </div>
    </div>
  );
}

