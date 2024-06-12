import { useState } from "react";
import "./App.css";
import MovieList from "./MovieList.jsx";

const App = () => {
  const [tempSearchQuery, setTempSearchQuery] = useState("");
  const [searchquery, setSearchquery] = useState("");

  const [selectedOption, setSelectedOption] = useState("title");

  const handleSearchChange = (event) => {
    setTempSearchQuery(event.target.value);
  };

  const handleSearch = () => {
    setSearchquery(tempSearchQuery);
    if (tempSearchQuery == "") {
      handleReset();
    }
  };
  const handleReset = () => {
    window.location.reload();
  };

  return (
    <div className="App">
      <div className="mainheader">
        <h1>Flixter</h1>

        <select
          onChange={(e) => {
            setSelectedOption(e.target.value);
          }}
        >
          <option value="title">Alphabetical</option>
          <option value="releaseDate">Release Date</option>
          <option value="rating">Rating</option>
        </select>

        <input
          type="text"
          value={tempSearchQuery}
          onChange={handleSearchChange}
          placeholder="Search for movies"
        />
        <div id="sortdialog"></div>

        <button id="searchbutton" onClick={handleSearch}>
          Search
        </button>
        <button onClick={handleReset}>Reset Search</button>
        <button onClick={handleReset}>View Featured Movies</button>
      </div>

      <div className="overlay">
        <div className="modal">
          <div id="modelnovieinfo" className="modal-content">
            <p>!!!!!modelnovieinfo!!!!!</p>
          </div>
        </div>
      </div>

      <MovieList searchquery={searchquery} sortoption={selectedOption} />
    </div>
  );
};

export default App;
