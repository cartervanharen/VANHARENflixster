import { useState } from "react";
import "./App.css";
import MovieList from "./MovieList.jsx";
let searched = 0;
const App = () => {
  const [tempSearchQuery, setTempSearchQuery] = useState("");
  const [searchquery, setSearchquery] = useState("");

  const handleSearchChange = (event) => {
    setTempSearchQuery(event.target.value);
  };

  const handleSearch = () => {
    setSearchquery(tempSearchQuery);
    if (tempSearchQuery=="") { 

      const searchbutton = document.getElementById("searchbutton");

      searchbutton.textContent = "Search"; 

      window.location.reload()
      searched = 1;


    } else {
      const searchbutton = document.getElementById("searchbutton");
      console.log("inelseloop")

      searchbutton.textContent = "Reset"; 

      if (searched === 1){
        window.location.reload();
        console.log("RESETTING")
        searched = 0

      }
    }

  };

  const handleReset = () => {
    window.location.reload();
  };

  return (
    <div className="App">
      <input
        type="text"
        value={tempSearchQuery}
        onChange={handleSearchChange}
        placeholder="Search for movies"
      />
      <button id="searchbutton" onClick={handleSearch}>Search</button>
      <button onClick={handleReset}>Reset Search</button>
      <button onClick={handleReset}>View Featured Movies</button>

      <MovieList searchquery={searchquery} />
    </div>
  );
};

export default App;
