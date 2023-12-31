import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import ReviewList from "./ReviewList.js";
import ReviewForm from "./ReviewForm";
import useAuth from "../../hooks/useAuth";

const BookDetailPage = () => {
  const [user, token] = useAuth();
  const { bookId } = useParams();
  const [bookDetails, setBookDetails] = useState(null);

  useEffect(() => {
    const fetchBookDetails = async () => {
      try {
        const response = await axios.get(
          `https://www.googleapis.com/books/v1/volumes/${bookId}`
        );

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

  const handleReviewSubmit = async ({ text, rating }) => {
    try {
      // Define your authentication token (replace with your actual token)
      const token = "YOUR_AUTH_TOKEN";

      // Send POST request to your backend API with the review data and headers
      await axios.post(
        "https://localhost:5001/api/reviews",
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        },
        {
          bookId: bookId,
          text: text,
          rating: rating,
        }
      );

      // Optionally, you can refresh the reviews list after a successful submission
      // fetchReviewsAndRefresh(); // You might need to implement this function
    } catch (error) {
      console.error("Error submitting review", error);
    }
  };

  if (!bookDetails) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>Book Detail Page</h2>
      {bookDetails.thumbnail && (
        <img src={bookDetails.thumbnail} alt="Book Thumbnail" />
      )}

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
      <ReviewList bookDetails={bookDetails} bookId={bookId} />
      <ReviewForm onSubmit={handleReviewSubmit} />
    </div>
  );
};

export default BookDetailPage;
