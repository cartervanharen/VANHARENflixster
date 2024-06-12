import PropTypes from "prop-types";
import { useState, useEffect } from "react";
const apiKey = import.meta.env.VITE_API_KEY;
import "./App.jsx";
import MovieCard from "./MovieCard.jsx";
import Modalpop from "./modal.jsx";

const MovieList = ({ searchquery, sortoption }) => {
  const [movies, setMovies] = useState([]);
  const [updatecounter, setUpdatecounter] = useState(0); //force updates
  let [pagestoload, setPagestoload] = useState(0);
  // eslint-disable-next-line no-unused-vars
  const [sortCriteria, setSortCriteria] = useState("title");
  const [modalOpen, setModalOpen] = useState(0); // 0 for closed, 1 for open
  const [selectedMovie, setSelectedMovie] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      if (pagestoload === 0) {
        // eslint-disable-next-line react-hooks/exhaustive-deps
        pagestoload = 1; //avoid erroneous errors where page gets set to 0
      }
      let url = `https://api.themoviedb.org/3/${
        searchquery ? "search/movie" : "movie/now_playing"
      }?api_key=${apiKey}${
        searchquery ? `&query=${searchquery}` : ""
      }&page=${pagestoload}&append_to_response=videos`;

      try {
        const response = await fetch(url);
        const data = await response.json();

        const newMovies = data.results.map((movie) => ({
          title: movie.title,
          releaseDate: movie.release_date,
          posterImageUrl: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
          rating: movie.vote_average,
          overview: movie.overview,
          id: movie.id,


        }));
        let newmoviesunsorted = searchquery
          ? newMovies
          : [...movies, ...newMovies];

        const uniqueMovies = [...newmoviesunsorted].filter(
          (movie, index, self) =>
            self.findIndex((m) => m.title === movie.title) === index
        );

        setMovies(uniqueMovies);
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchData();
  }, [pagestoload, searchquery, updatecounter]);

  useEffect(() => {
    setPagestoload(1);
    setMovies([]);
    sortMovies(sortoption);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchquery, sortoption]);

  const handleLoadMore = () => {
    setPagestoload((prevPage) => prevPage + 1);
  };

  const sortMovies = (criteria) => {
    setUpdatecounter(updatecounter + 1);
    const sortedMovies = [...movies].sort((a, b) => {
      if (a[criteria] < b[criteria]) return -1;
      if (a[criteria] > b[criteria]) return 1;
      return 0;
    });
    setMovies(sortedMovies);
    setSortCriteria(criteria);
  };

  const openModal = (movie) => {
    setSelectedMovie(movie);
    setModalOpen(1);
  };

  return (
    <>
      <div>
        <div id="movieboxcontainer">
          {movies.map((movie) => (
            <div key={movie.title} onClick={() => openModal(movie)}>
              <MovieCard
                title={movie.title}
                rating={movie.rating}
                url={movie.posterImageUrl}
              />
            </div>
          ))}
        </div>
        {!searchquery && <button onClick={handleLoadMore}>Load More</button>}
        {modalOpen === 1 && (
          <Modalpop
            openstatus={modalOpen}
            setOpenStatus={setModalOpen}
            movie={selectedMovie}
          />
        )}
      </div>
    </>
  );
};

MovieList.propTypes = {
  searchquery: PropTypes.string,
  sortoption: PropTypes.string,
};

export default MovieList;
