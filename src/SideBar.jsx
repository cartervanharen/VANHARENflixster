import PropTypes from 'prop-types';
import './SideBar.css'; // Assuming you have a CSS file for styling

const Sidebar = ({ likedMovies, watchedMovies }) => {
  return (
    <div className="sidebar">
      <div className="sidebar-section">
        <h2>Liked Movies</h2>
        <ul>
          {likedMovies.map((movie, index) => (
            <li key={index}>{movie.title}</li>
          ))}
        </ul>
      </div>
      <div className="sidebar-section">
        <h2>Watched Movies</h2>
        <ul>
          {watchedMovies.map((movie, index) => (
            <li key={index}>{movie.title}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

Sidebar.propTypes = {
  likedMovies: PropTypes.array.isRequired,
  watchedMovies: PropTypes.array.isRequired,
};

export default Sidebar;