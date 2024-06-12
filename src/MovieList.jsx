import PropTypes from "prop-types";
import { useState, useEffect } from "react";
const apiKey = import.meta.env.VITE_API_KEY;
import "./App.jsx";
import MovieCard from "./MovieCard.jsx";






const MovieList = ({ searchquery,sortoption}) => {
    console.log(sortoption)
  const [movies, setMovies] = useState([]);
  // eslint-disable-next-line no-unused-vars
  let [updatecounter, setUpdatecounter] = useState(0); //force updates

  let [pagestoload, setPagestoload] = useState(0);
  // eslint-disable-next-line no-unused-vars
  const [sortCriteria, setSortCriteria] = useState("title");

  useEffect(() => {
    const fetchData = async () => {
    
        if (pagestoload == 0){ 
            // eslint-disable-next-line react-hooks/exhaustive-deps
            pagestoload = 1; //avoid erroneous errors where page gets set to 0
        }
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

        const newMovies = data.results.map((movie) => ({
          title: movie.title,
          releaseDate: movie.release_date,
          posterImageUrl: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
          rating: movie.vote_average,
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

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pagestoload, searchquery, updatecounter]);

  useEffect(() => {
    //console.log("Search query changed:", searchquery);
    setPagestoload(1);
    setMovies([]);
    sortMovies(sortoption)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchquery,sortoption]);


  
  const handleLoadMore = () => {
    setPagestoload((prevPage) => prevPage + 1);
  };

  const sortMovies = (criteria) => {
    setUpdatecounter++;
    const sortedMovies = [...movies].sort((a, b) => {
      if (a[criteria] < b[criteria]) return -1;
      if (a[criteria] > b[criteria]) return 1;
      return 0;
    });
    setMovies(sortedMovies);
    setSortCriteria(criteria);
  };

  //   const sortDialog = document.getElementById("sortdialog");
  //   const contentToAdd = (

  //   );
  //   sortDialog.appendChild(contentToAdd);

  // const sortDialog = document.getElementById("sortdialog");
  // const contentToAdd = (

  //     <select onChange={(e) => sortMovies(e.target.value)}>
  //       <option value="title">Alphabetical</option>
  //       <option value="releaseDate">Release Date</option>
  //       <option value="rating">Rating</option>
  //     </select>

  // );
  // sortDialog.appendChild(contentToAdd);
  return (
    <>
      <div>
        {/* <select onChange={() => sortMovies(sortoption)}>
          <option value="title">Alphabetical</option>
          <option value="releaseDate">Release Date</option>
          <option value="rating">Rating</option>
        </select> */}

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
  sortoption: PropTypes.string,
};

export default MovieList;
