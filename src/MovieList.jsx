import PropTypes from "prop-types";
import { useState, useEffect } from "react";
const apiKey = import.meta.env.VITE_API_KEY;

import MovieCard from "./MovieCard.jsx";

const MovieList = ({ searchquery }) => {
  const [movies, setMovies] = useState([]);
  const [pagestoload, setPagestoload] = useState([]);
  // eslint-disable-next-line no-unused-vars
  const [sortCriteria, setSortCriteria] = useState('title');

  useEffect(() => {
    const fetchData = async () => {
        let url = `https://api.themoviedb.org/3/${
          searchquery ? "search/movie" : "movie/now_playing"
        }?api_key=${apiKey}${
          searchquery ? `&query=${searchquery}` : ""
        }&page=${pagestoload}`;
        //console.log(`Fetching data from: ${url}`);
      
        try {
          const response = await fetch(url);
          const data = await response.json();
          //console.log("Data fetched:", data);
      
          const newMovies = data.results
            .map((movie) => ({
              title: movie.title,
              releaseDate: movie.release_date,
              posterImageUrl: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
              rating: movie.vote_average,
            }))
            .reduce((acc, current) => {
              const x = acc.find(item => item.title === current.title);
              if (!x) {
                return acc.concat([current]);
              } else {
                return acc;
              }
            }, []);
      
          setMovies(searchquery ? newMovies : [...movies, ...newMovies]);
          //console.log("addingmore");
        } catch (error) {
          console.error("Error:", error);
        }
      };

    fetchData();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pagestoload, searchquery]);

  useEffect(() => {
    //console.log("Search query changed:", searchquery);
    setPagestoload(1);
    setMovies([]);
  }, [searchquery]);

  const handleLoadMore = () => {
    setPagestoload((prevPage) => prevPage + 1);
  };

  const sortMovies = (criteria) => {
    const sortedMovies = [...movies].sort((a, b) => {
      if (a[criteria] < b[criteria]) return -1;
      if (a[criteria] > b[criteria]) return 1;
      return 0;
    });
    setMovies(sortedMovies);
    setSortCriteria(criteria);
  };

  //console.log("Rendering movies:", movies);

  return (
    <>
      <div>
        <select onChange={(e) => sortMovies(e.target.value)}>
          <option value="title">Alphabetical</option>
          <option value="releaseDate">Release Date</option>
          <option value="rating">Rating</option>
        </select>
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
        {!searchquery && <button onClick={handleLoadMore}>Load More</button>}
        



      </div>
    </>
  );
};

MovieList.propTypes = {
  searchquery: PropTypes.string,
};

export default MovieList;