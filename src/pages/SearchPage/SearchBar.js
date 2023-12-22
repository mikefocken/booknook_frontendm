import React, { useState } from "react";
import axios from "axios";

const SearchBar = ({ setResults }) => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = async () => {
    try {
      console.log(`Searching for ${searchQuery}`);
      const response = await axios.get(
        `https://www.googleapis.com/books/v1/volumes?q=${searchQuery}`
      );

      // Extract the relevant information from the API response
      const books = response.data.items.map((item) => {
        return {
          id: item.id, // Include the book ID for routing
          title: item.volumeInfo.title,
        };
      });

      // Update the results in the SearchPage component
      setResults(books);
    } catch (error) {
      console.error("Error fetching data from Google Books API", error);
    }
  };

  return (
    <div>
      <input
        type="text"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        placeholder="Enter your search query"
      />
      <button onClick={handleSearch}>Search</button>
    </div>
  );
};

export default SearchBar;
