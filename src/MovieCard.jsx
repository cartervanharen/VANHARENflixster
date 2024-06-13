import "./MovieCard.css";
import PropTypes from "prop-types";

const MovieCard = (props) => {
  return (
    <>
      <div className="MovieCardBox">
        <p className="moviecardtitle">{props.title}</p>

        <div className="lowermoviecardcontent">
          <img className="moviecardimage" src={props.url} />

          <p>Rating: {props.rating}</p>
        </div>
      </div>
    </>
  );
};

MovieCard.propTypes = {
  rating: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
};

export default MovieCard;
