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
        <p className="maintitle"> Flixster</p>

        <input
          className="searchbar"
          type="text"
          value={tempSearchQuery}
          onChange={handleSearchChange}
          placeholder="Search for movies"
        />
        <div id="sortdialog"></div>

        <button
          className="generalButtonstyle"
          id="searchbutton"
          onClick={handleSearch}
        >
          Search
        </button>
        <button className="generalButtonstyle" onClick={handleReset}>
          Reset
        </button>

        <div className="sortbar">
          <select
            onChange={(e) => {
              setSelectedOption(e.target.value);
            }}
          >
            <option value="title">Alphabetical</option>
            <option value="releaseDate">Release Date</option>
            <option value="rating">Rating</option>
          </select>
        </div>
      </div>

      <div className="movielistdiv">
        <MovieList searchquery={searchquery} sortoption={selectedOption} />
      </div>

      <div className="footer">CARTER VANHAREN</div>
    </div>
  );
};

export default App;
