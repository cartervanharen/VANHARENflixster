
import PropTypes from 'prop-types';
import './Modal.css'; 

const Modal = ({ isOpen, onClose, movie }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <span className="close-button" onClick={onClose}>&times;</span>
        <img src={movie.posterImageUrl} alt={`Banner of ${movie.title}`} />
        <h2>{movie.title}</h2>
        <p>Rating: {movie.rating}</p>
        <p>Release Date: {movie.releaseDate}</p>
      </div>
    </div>
  );
};

Modal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  movie: PropTypes.object,
};

export default Modal;