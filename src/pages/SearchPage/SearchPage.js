import SearchBar from "./SearchBar";
import React, { useState } from "react";
import ResultsList from "./ResultsList";
const SearchPage = () => {
  const [results, setResults] = useState([]);
  //pass setResults to SearchBar, use to hold response data
  //pass results state variable to ResultsList component

  return (
    <div>
      <h2>Search Page</h2>
      <SearchBar setResults={setResults} />
      <ResultsList results={results}/>
    </div>
  );
};

export default SearchPage;
