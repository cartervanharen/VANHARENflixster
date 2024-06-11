import { useState } from "react";
import "./App.css";
import MovieList from "./MovieList.jsx";

const App = () => {
  const [tempSearchQuery, setTempSearchQuery] = useState("");
  const [searchquery, setSearchquery] = useState(""); 

  const handleSearchChange = (event) => {
    setTempSearchQuery(event.target.value); 
  };

  const handleSearch = () => {
    setSearchquery(tempSearchQuery); 
  };

  const handleReset = () => {
    window.location.reload()  };

  return (
    <div className="App">
      <input
        type="text"
        value={tempSearchQuery}
        onChange={handleSearchChange}
        placeholder="Search for movies"
      />
      <button onClick={handleSearch}>Search</button>
      <button onClick={handleReset}>Reset Search</button>
      <button onClick={handleReset}>View Featured Movies</button>

      <MovieList searchquery={searchquery} />
    </div>
  );
};

export default App;