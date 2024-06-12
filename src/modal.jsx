import PropTypes from "prop-types";
import { useState, useEffect } from "react";
import "./modal.css";
const apiKey = import.meta.env.VITE_API_KEY;

const Modal = ({ openstatus, setOpenStatus, movie }) => {
  const [genreNames, setGenreNames] = useState(null);
  var [firstTrailerId, setFirstTrailerId] = useState("");

  useEffect(() => {
    if (openstatus !== 1) return;

    const fetchData = async () => {
      const url = `https://api.themoviedb.org/3/movie/${movie.id}?api_key=${apiKey}&append_to_response=videos`;
      const response = await fetch(url);
      const data = await response.json();

      data.genres.sort((a, b) => a.name.localeCompare(b.name));

      const genreList = data.genres.map((genre) => genre.name);

       firstTrailerId = data.videos.results.find((video) => video.type === "Trailer" )?.key;


      console.log(firstTrailerId);
      setFirstTrailerId(firstTrailerId)
      setGenreNames(genreList);
    };

    fetchData();
  }, [openstatus, movie]);

  if (openstatus !== 1) return null;
  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>{movie.title}</h2>
        <p>
          <strong>Release Date:</strong> {movie.releaseDate}
        </p>
        <p>
          <strong>Rating:</strong> {movie.rating}
        </p>
        <p>
          <strong>Overview:</strong> {movie.overview}
        </p>
        <p>
          <strong>Genres:</strong>
          {genreNames ? genreNames.join(", ") : "Unknown"}
        </p>

        <img src={movie.posterImageUrl} alt={movie.title} />


        <div>



        <iframe
        width="400"
        height="300"
        src={"https://www.youtube.com/embed/" + firstTrailerId}
        title="YouTube video player"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerPolicy="strict-origin-when-cross-origin"
        allowfullscreen
      ></iframe>



        </div>



        <button onClick={() => setOpenStatus(0)}>Close</button>



        
      </div>


    </div>
  );
};

Modal.propTypes = {
  openstatus: PropTypes.number.isRequired,
  setOpenStatus: PropTypes.func.isRequired,
  movie: PropTypes.object,
};

export default Modal;
