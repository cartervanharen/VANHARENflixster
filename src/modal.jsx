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

      // eslint-disable-next-line react-hooks/exhaustive-deps
      firstTrailerId = data.videos.results.find(
        (video) => video.type === "Trailer"
      )?.key;

      console.log(firstTrailerId);
      setFirstTrailerId(firstTrailerId);
      setGenreNames(genreList);
    };

    fetchData();
  }, [openstatus, movie]);

  if (openstatus !== 1) return null;
  return (
    <div className="modal-overlay" onClick={() => setOpenStatus(0)}>
      <div className="modal-content">
        <p className="movietitletext">{movie.title}</p>
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

        <div className="flexboxforvisuals">
          <img
            className="imgposter"
            src={movie.posterImageUrl}
            alt={movie.title}
          />

          <div>
            <iframe
              className="videostyle"
              width="566"
              height="300"
              src={"https://www.youtube.com/embed/" + firstTrailerId}
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowfullscreen
            ></iframe>
          </div>
        </div>

        <button className="closebutton" onClick={() => setOpenStatus(0)}>
          Close
        </button>

        <br></br>
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
