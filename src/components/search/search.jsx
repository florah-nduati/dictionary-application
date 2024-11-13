import React, { useState } from "react";
import useWordParamStore from "../Stores/WordParam";
import "./search.css";

function Search() {
  const changeWord = useWordParamStore((state) => state.setWord);
  const [wordParam, setWordParam] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();
    changeWord(wordParam);
  };

  return (
    <div className="search">
      <h2>My Dictionary: Made by Florah Nduati</h2>
      <div className="form-group">
        <label htmlFor="word" className="form-group-label">
          Search for a word:
        </label>
        <input
          type="text"
          id="word" 
          className="input"
          placeholder="Search any word"
          value={wordParam}
          onChange={(e) => setWordParam(e.target.value)}
        />
        <button className="button" onClick={handleSearch}>
          Search
        </button>
      </div>
    </div>
  );
}

export default Search;
