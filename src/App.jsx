import { useState } from 'react';
import './App.css';
import MovieList from './MovieList.jsx';

const App = () => {
  const [pagestoload, setPagestoload] = useState(1);

  const handleLoadMore = () => {
    setPagestoload(pagestoload + 1);
  };

  return (
    <div className="App">
      <MovieList pagestoload={pagestoload} />
      <button onClick={handleLoadMore}>Load More</button>
    </div>
  );
};

export default App;