import React from "react";
import { useState, useEffect } from "react";
import "./styles.css";

import { getSingleChar } from "../../services/api";

function Favorites() {
  const [favoriteCharsIds, setFavoriteCharsIds] = useState([]);
  const [charsArray, setCharsArray] = useState([]);
  const [ready, setReady] = useState(false);

  // FUNÇÃO REPETIDAAAAA... @
  function showCharPage(e) {
    const string = e.target.parentNode.id || e.target.id;
    const stringIntoArray = string.split("");
    const id = stringIntoArray.slice(1).join("");
    window.location.assign(`/character/${id}`);
  }
  // ...AAAAAAAAAAA

  const fetchChars = async () => {
    const storedFavorites = localStorage.getItem("favorites");
    const parsedFavorites = storedFavorites ? JSON.parse(storedFavorites) : [];
    setFavoriteCharsIds(parsedFavorites);

    const characters = await Promise.all(parsedFavorites.map(getSingleChar));

    setCharsArray(characters);
    setReady(true);
  };

  useEffect(() => {
    fetchChars();
  }, []);

  return (
    <div className="container">
      <h2>Personagens favoritos</h2>

      <ul className="chars-container">
        {ready === true ? (
          favoriteCharsIds.length > 0 ? (
            charsArray.map((char) => (
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
          )
        ) : (
          "Carregando..."
        )}
      </ul>
    </div>
  );
}

export default Favorites;