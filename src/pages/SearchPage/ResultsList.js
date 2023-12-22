import React from "react";
import { Link } from "react-router-dom";

const ResultsList = ({ results }) => {
  return (
    <div>
      <h2>Results List</h2>
      <ul>
        {results.map((result, index) => (
          <li key={index}>
            <Link to={`/book/${result.id}`}>
              <strong>Authors:</strong>{" "}
              {result.authors ? result.authors.join(", ") : "N/A"}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ResultsList;
