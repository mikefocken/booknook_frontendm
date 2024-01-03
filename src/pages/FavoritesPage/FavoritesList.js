import React, { useState, useEffect } from "react";
import axios from "axios";

const FavoritesList = () => {
  const [favorites, setFavorites] = useState([]);
  const [token, setToken] = useState("");

  useEffect(() => {
  
    const fetchFavorites = async () => {
      try {
        const response = await axios.get(
          "https://localhost:5001/api/favorites/",
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );

        const formattedFavorites = response.data.map((favorite) => ({
          title: favorite.title,
          thumbnail: favorite.thumbnailUrl,
        }));

        setFavorites(formattedFavorites);
      } catch (error) {
        console.error(error.message);
      }
    };

    fetchFavorites();
  }, [token]);

  return (
    <div>
      <h1>My Favorites</h1>
      <ul>
        {favorites.map((favorite, index) => (
          <li key={index}>
            <h3>{favorite.title}</h3>
            <img src={favorite.thumbnail} alt={favorite.title} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FavoritesList;
