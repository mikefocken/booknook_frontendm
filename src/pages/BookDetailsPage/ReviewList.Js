import React, { useEffect, useState } from "react";
import axios from "axios";
import useAuth from "../../hooks/useAuth";

const ReviewList = ({ bookId, bookDetails }) => {
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
    try {
      console.log("Favorite Button Clicked. Current State:", !isBookFavorited);

      const favoriteData = {
        bookId: bookId,
        title: bookDetails.title,
        thumbnailUrl: bookDetails.thumbnail,
      };

      await axios.post("https://localhost:5001/api/favorites/", favoriteData, {
        headers: {
          Authorization: "Bearer " + token,
          "Content-Type": "application/json",
        },
      });
    } catch (error) {
      console.error("Error toggling favorite status", error);
      setIsBookFavorited((prevIsBookFavorited) => !prevIsBookFavorited);
    }
  };

  return (
    <div>
      <p>Average Rating: {averageRating}</p>
      <h3> User Reviews:</h3>

      <ul>
        {reviews.map((review) => (
          <li key={review.id}>
            {review.owner.userName}:{review.text}
          </li>
        ))}
      </ul>
      {console.log("isfavorite", isBookFavorited)}
      <button
        onClick={handleFavoriteToggle}
        style={{
          backgroundColor: isBookFavorited ? "green" : "gray",
          color: "blue",
          padding: "8px",
          borderRadius: "5px",
          cursor: "pointer",
        }}
      >
        {isBookFavorited ? "Favorited" : "Favorite"}
      </button>
    </div>
  );
};

export default ReviewList;
