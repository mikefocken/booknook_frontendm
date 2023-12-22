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

        // Extract the relevant information from the API response
        const volumeInfo = response.data.volumeInfo;

        const book = {
          thumbnail: volumeInfo.imageLinks?.thumbnail || null,
          title: volumeInfo.title,
          authors: volumeInfo.authors || [],
          description: volumeInfo.description || "No description available",
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
      {bookDetails.thumbnail && (
        <img src={bookDetails.thumbnail} alt="Book Thumbnail" />
      )}
      <button>Favorite</button>
      <p>
        <strong>Title:</strong> {bookDetails.title}
      </p>
      <p>
        <strong>Authors:</strong>{" "}
        {bookDetails.authors.length > 0
          ? bookDetails.authors.join(", ")
          : "N/A"}
      </p>
      <p>
        <strong>Description:</strong> {bookDetails.description}
      </p>
    </div>
  );
};

export default BookDetailPage;
