import React from "react";
import { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import axios from "axios";

const FavoritesPage = () => {
  const [user, token] = useAuth();
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    fetchFavorites();
  }, [token]);

  const fetchFavorites = async () => {
    try {
      let response = await axios.get("https://localhost:5001/api/favorites/", {
        headers: {
          Authorization: "Bearer " + token,
        },
      });
      setFavorites(response.data);
    } catch (error) {
      console.log(error.response.data);
    }
  };

  return (
    <div>
      <h1>My Favorites</h1>
      {console.log(user)}
      {favorites.length > 0 ? (
        favorites.map((favorite) => (
          <div key={favorite.id}>
            <h3>{favorite.title}</h3>
            <img src={favorite.thumbnail} alt={favorite.title} />
          </div>
        ))
      ) : (
        <p>You have no favorites yet.</p>
      )}
    </div>
  );
};

export default FavoritesPage;
