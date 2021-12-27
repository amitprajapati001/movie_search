import React, { useState } from "react";

export default function SearchMovies() {
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState([]);

  const searchMovies = async (e) => {
    e.preventDefault();
    const url = `https://api.themoviedb.org/3/search/movie?api_key=5c154ee0124acaaa75525eb289958657&language=en-US&query=${query}&page=1&include_adult=false`;
    try {
      const res = await fetch(url);
      const data = await res.json();

      setMovies(data.results);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="parent">
      <form className="form" onSubmit={searchMovies}>
        {/* <label className="label">Movie Name</label> */}
        <input
          type="text"
          placeholder="i.e Spider-Man"
          className="SearchInput"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button className="button" type="submit">
          Search
        </button>
      </form>

      <div className="card-list">
        {movies
          .filter((movie) => movie.poster_path)
          .map((movie) => (
            <div className="card">
              <img
                className="pic"
                src={`https://image.tmdb.org/t/p/w185_and_h278_bestv2/${movie.poster_path}`}
              />
              <div className="content">
                <div className="fo">
                  <p>
                    <strong>{movie.title}</strong>
                  </p>
                  <p>
                    <strong>Release Date:</strong> {movie.release_date}
                  </p>
                  <p>
                    <strong>Rating:</strong> {movie.vote_average}
                  </p>
                </div>
                <p className="overview">
                  <strong>Overview:</strong> {movie.overview}
                </p>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}
