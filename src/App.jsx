import React, { useState, useEffect } from 'react'
import axios from 'axios'
import MovieList from './components/MovieList'

const App = () => {
  const [movies, setMovies] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [loading, setLoading] = useState(true)

  const fetchMovies = async () => {

    try {
      const response = await axios.get(
        `https://api.themoviedb.org/3/movie/now_playing?api_key=${import.meta.env.VITE_APP_API_KEY}&page=1`
      )
      setMovies(response.data.results)
    } catch (error) {
      console.error("Error fetching movies:", error)
    } finally {
      setLoading(false)
    }
  }

  const searchMovie = async (e) => {
    e.preventDefault()
    if (!searchTerm) return
    setLoading(true)
    try {
      const response = await axios.get(
        `https://api.themoviedb.org/3/search/movie?api_key=${import.meta.env.VITE_APP_API_KEY}&query=${searchTerm}`
      )
      setMovies(response.data.results)
    } catch (error) {
      console.error("Error searching movie:", error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchMovies()
  }, [])

  return (
    <div className="App">
      <header>
        <h1>Movies App</h1>
        <form onSubmit={searchMovie}>
          <input
            type="text"
            placeholder="Search for a movie..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button type="submit">Search</button>
        </form>
      </header>
      {loading ? (
        <p>Loading...</p>
      ) : movies.length == 0 ? (
        <p>No movies found.</p>
      ) : (
        <MovieList movies={movies} />
      )}
    </div>
  )
}

export default App
