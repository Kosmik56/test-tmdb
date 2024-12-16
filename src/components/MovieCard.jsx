import React from 'react'

const MovieCard = ({ movie }) => {
  const imageUrl = movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : '/no_poster.png'
  return (
    <div className="movie-card">
      <img src={imageUrl} alt={movie.title || 'Movie poster'} />
      <h3>{movie.title}</h3>
      <p>Rating: {movie.vote_average || 'N/A'}</p>
    </div>
  )
}

export default MovieCard