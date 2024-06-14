import "./MovieCard.css";
import PropTypes from "prop-types";

const MovieCard = (props) => {
  const handleLikeClick = (event) => {
    event.stopPropagation(); // Prevents the event from bubbling up to parent elements
    props.onLike();
  };

  const handleWatchedClick = (event) => {
    event.stopPropagation(); // Prevents the event from bubbling up to parent elements
    props.onWatched();
  };

  return (
    <div className="MovieCardBox">
      <p className="moviecardtitle">{props.title}</p>
      <div className="lowermoviecardcontent">
        <img className="moviecardimage" src={props.url} alt={`Poster of ${props.title}`} />
        <p>Rating: {props.rating}</p>
        <button onClick={handleLikeClick}>Like</button>
        <button onClick={handleWatchedClick}>Already Watched</button>
      </div>
    </div>
  );
};

MovieCard.propTypes = {
  rating: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
  onLike: PropTypes.func.isRequired,
  onWatched: PropTypes.func.isRequired,
};

export default MovieCard;