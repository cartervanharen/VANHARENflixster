import PropTypes from "prop-types";
import { useState, useEffect } from "react";
const apiKey = import.meta.env.VITE_API_KEY;

import MovieCard from "./MovieCard.jsx";

const MovieList = ({ searchquery }) => {
  const [movies, setMovies] = useState([]);
  const [pagestoload, setPagestoload] = useState(1);

  useEffect(() => {
    const fetchData = async () => {
      let url = `https://api.themoviedb.org/3/${searchquery ? 'search/movie' : 'movie/now_playing'}?api_key=${apiKey}${searchquery ? `&query=${searchquery}` : ''}&page=${pagestoload}`;
      console.log(`Fetching data from: ${url}`); 

      try {
        const response = await fetch(url);
        const data = await response.json();
        console.log('Data fetched:', data); 

        const newMovies = data.results.map((movie) => ({
          title: movie.title,
          posterImageUrl: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
          rating: movie.vote_average,
        }));

        setMovies(searchquery ? newMovies : [...movies, ...newMovies]);
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchData();
  }, [pagestoload, searchquery]);

  useEffect(() => {
    console.log('Search query changed:', searchquery); 
    setPagestoload(1);
    setMovies([]);
  }, [searchquery]);

  const handleLoadMore = () => {
    setPagestoload((prevPage) => prevPage + 1);
  };

  console.log('Rendering movies:', movies); 

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
        <button onClick={handleLoadMore}>Load More</button>
      </div>
    </>
  );
};

MovieList.propTypes = {
  searchquery: PropTypes.string,
};

export default MovieList;