import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const BookDetailPage = () => {
  const { bookId } = useParams();
  const [bookDetails, setBookDetails] = useState(null);

  useEffect(() => {
    const fetchBookDetails = async () => {
      try {
        const response = await axios.get(
          `https://www.googleapis.com/books/v1/volumes/${bookId}`
        );

        // this should get information from G-Api
        const book = {
          title: response.data.volumeInfo.title,
          authors: response.data.volumeInfo.authors,
          // Add other properties as needed
        };

        setBookDetails(book);
      } catch (error) {
        console.error(
          "Error fetching book details from Google Books API",
          error
        );
      }
    };

    fetchBookDetails();
  }, [bookId]);

  if (!bookDetails) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>Book Detail Page</h2>
      <p>
        <strong>Title:</strong> {bookDetails.title}
      </p>
      <p>
        <strong>Authors:</strong>{" "}
        {bookDetails.authors ? bookDetails.authors.join(", ") : "N/A"}
      </p>
    </div>
  );
};

export default BookDetailPage;
