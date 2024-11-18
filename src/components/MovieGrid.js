import React, { useEffect, useState } from "react";
import axios from "axios";
import MovieCard from "./MovieCard";

function MovieGrid() {
  const [movies, setMovies] = useState([]);
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("https://swapi.dev/api/films/")
      .then((response) => {
        setMovies(response.data.results);
        setFilteredMovies(response.data.results);
        setLoading(false);
      })
      .catch((error) => console.error("Error fetching movies:", error));
  }, []);

  const handleSearch = (event) => {
    const term = event.target.value.toLowerCase();
    setSearchTerm(term);

    const filtered = movies.filter((movie) =>
      movie.title.toLowerCase().includes(term)
    );

    setFilteredMovies(filtered);
  };

  if (loading) {
    return <div className="text-center">Loading...</div>;
  }

  return (
    <div className="container mx-auto">
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search for a movie..."
          value={searchTerm}
          onChange={handleSearch}
          className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredMovies.length > 0 ? (
          filteredMovies.map((movie) => (
            <MovieCard key={movie.episode_id} movie={movie} />
          ))
        ) : (
          <div className="col-span-full text-center text-gray-500">
            No movies found.
          </div>
        )}
      </div>
    </div>
  );
}

export default MovieGrid;
