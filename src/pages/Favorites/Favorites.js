import { useState, useEffect } from "react";
import "./styles.css";

import { getSingleCharInfo } from "../../services/api";
import { showCharPage } from "../../utils/utils";

function Favorites() {
  const [favoriteCharsIds, setFavoriteCharsIds] = useState([]);
  const [chars, setChars] = useState([]);

  async function fetchChars() {
    const storedFavorites = localStorage.getItem("favorites");
    const parsedFavorites = storedFavorites ? JSON.parse(storedFavorites) : [];
    setFavoriteCharsIds(parsedFavorites);

    setChars(await Promise.all(parsedFavorites.map(getSingleCharInfo)));
  };

  useEffect(() => {
    fetchChars();
  }, []);

  return (
    <div className="container">
      <h2>Personagens favoritos</h2>

      <ul className="chars-container">
        {favoriteCharsIds.length > 0 ? (
          chars.map((char) => (
            <li
              className="char"
              key={char.id}
              id={"-" + char.id}
              onClick={showCharPage}
            >
              <img
                src={char.image}
                alt={`Imagem do personagem ${char.name}.`}
              />
              <p>{char.name}</p>
            </li>
          ))
        ) : (
          <p className="fav-text text-2">
            Você ainda não favoritou nenhum personagem.
          </p>
        )}
      </ul>
    </div>
  );
}

export default Favorites;