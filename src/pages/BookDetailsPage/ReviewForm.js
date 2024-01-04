// ReviewForm.js
import React, { useState } from "react";


const ReviewForm = ({ onSubmit }) => {
  const [reviewText, setReviewText] = useState("");
  const [rating, setRating] = useState(1);

  const handleReviewSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted!");
    onSubmit({ text: reviewText, rating });
  };

  return (
    <form onSubmit={handleReviewSubmit}>
      <label>
        Review Text:
        <textarea
          value={reviewText}
          onChange={(e) => setReviewText(e.target.value)}
        />
      </label>

      <label>
        Rating:
        <input
          type="number"
          min="1"
          max="5"
          value={rating}
          onChange={(e) => setRating(parseInt(e.target.value))}
        />
      </label>

      <button type="submit">Submit Review</button>
    </form>
  );
};

export default ReviewForm;
