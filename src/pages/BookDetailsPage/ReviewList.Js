import React, { useEffect, useState } from "react";
import axios from "axios";
import useAuth from "../../hooks/useAuth";

const ReviewList = ({ bookId }) => {
  const [user, token] = useAuth();
  const [reviews, setReviews] = useState([]);
  const [averageRating, setAverageRating] = useState(0);
  const [isBookFavorited, setIsBookFavorited] = useState(false);

  useEffect(() => {
    const fetchReviewsAndFavorites = async () => {
      try {
        const response = await axios.get(
          `https://localhost:5001/api/BookDetails/${bookId}`,
          {
            headers: {
              Authorization: "Bearer " + token,
            },
          }
        );
        console.log(response.data);
        const { reviews, averageRating, isFavorited } = response.data;

        setReviews(reviews);
        console.log("Reviews:", reviews);
        setAverageRating(averageRating);
        setIsBookFavorited(isFavorited);
      } catch (error) {
        console.error("Error fetching reviews and favorites", error);
      }
    };

    fetchReviewsAndFavorites();
  }, [bookId, token]);
  const handleFavoriteToggle = async () => {
    // You can implement the logic to update the favorite status on the server
    // For simplicity, let's assume there's an API endpoint to toggle the favorite status
    try {
      // Update the isBookFavorited state locally for a quick UI response
      setIsBookFavorited((prev) => !prev);

      // You should also send a request to the server to update the favorite status
      await axios.post(
        `https://localhost:5001/api/BookDetails/${bookId}/toggleFavorite`,
        {},
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );
    } catch (error) {
      console.error("Error toggling favorite status", error);
    }
  };


  return (
    <div>
      <p>Average Rating: {averageRating}</p>
      <h3> User Reviews:</h3>

      <ul>
        {reviews.map((review) => (
          <li key={review.id}>{review.owner.userName}:{review.text}</li>
        ))}
      </ul>
      
    </div>
  );
};

export default ReviewList;
