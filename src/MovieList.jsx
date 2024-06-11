import "./MovieList.css";
import PropTypes from "prop-types";
import { useState, useEffect } from "react";
const apiKey = import.meta.env.VITE_API_KEY;

import MovieCard from "./MovieCard.jsx";

const MovieList = ({ pagestoload }) => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/movie/now_playing?api_key=${apiKey}&page=${pagestoload}`
        );
        const data = await response.json();

        setMovies(prevMovies => [
          ...prevMovies,
          ...data.results.map(movie => ({
            title: movie.title,
            posterImageUrl: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
            rating: movie.vote_average,
          }))
        ]);
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchData();
  }, [pagestoload]);

  return (
    <>
      <div>
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
  pagestoload: PropTypes.number.isRequired,
};

export default MovieList;