import { useState, useEffect } from "preact/hooks";
import "./app.css";
import SearchIcon from "./search.svg";
import MovieCard from "./MovieCard.jsx";

export function App() {
  const API_URL = import.meta.env.VITE_API_URL;
  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = () => {
    searchMovies(searchTerm);
  };

  const handleSpacePress = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  useEffect(() => {
    searchMovies("Batman");

    window.addEventListener("keydown", handleSpacePress);
    return () => {
      window.removeEventListener("keydown", handleSpacePress);
    };
  }, [searchTerm]);

  const searchMovies = async (title) => {
    const response = await fetch(`${API_URL}&s=${title}`);
    const data = await response.json();
    setMovies(data.Search);
  };

  return (
    <div className="app">
      <h1>MovieLand</h1>
      <div className="search">
        <input
          placeholder="Search for movies"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <img src={SearchIcon} alt="Search" onClick={handleSearch} />
      </div>
      {movies?.length > 0 ? (
        <div className="container">
          {movies.map((movie) => (
            <MovieCard key={movie.imdbID} movie={movie} />
          ))}
        </div>
      ) : (
        <div className="empty">
          <h2>No movies found</h2>
        </div>
      )}
    </div>
  );
}
