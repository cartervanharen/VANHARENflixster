import PropTypes from 'prop-types';
import './modal.css';

const Modal = ({ openstatus, setOpenStatus, movie }) => {
  if (openstatus !== 1) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>{movie.title}</h2>
        <p><strong>Release Date:</strong> {movie.releaseDate}</p>
        <p><strong>Rating:</strong> {movie.rating}</p>
        <p><strong>Overview:</strong> {movie.overview}</p>
        <img src={movie.posterImageUrl} alt={movie.title} />
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