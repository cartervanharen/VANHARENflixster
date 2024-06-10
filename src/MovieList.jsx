import "./MovieList.css";
import PropTypes from "prop-types";
import { useState, useEffect } from "react";

import MovieCard from "./MovieCard.jsx";
const apiKey = import.meta.env.VITE_API_KEY;

const MovieList = ({ stuff }) => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/movie/now_playing?api_key=${apiKey}&page=4`
        );
        const data = await response.json();

        setMovies(
          data.results.map((movie) => ({
            title: movie.title,
            posterImageUrl: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
            rating: movie.vote_average,
          }))
        );

        console.log(movies)
      } catch (error) {
        console.error("Error:", error);
      }
    };
    fetchData();
  }, []);

  return (
    <>
      <div>
        <p>Movielistbox</p>
        <p>{stuff}</p>
        <br></br>

        <div id="movieboxcontainer">
          {movies.map((movie) => (
            <div key={movie.title}>
              <MovieCard
                title={movie.title}
                rating={movie.rating}
                url={movie.posterImageUrl}
              />
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

MovieList.propTypes = {
  stuff: PropTypes.string.isRequired,
};

export default MovieList;
