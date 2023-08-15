import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { AiOutlineStar, AiFillStar } from "react-icons/ai";
import { BsFillArrowLeftCircleFill } from "react-icons/bs";
import "./styles.css";

import { getSingleChar } from "../../services/api";

function SingleChar() {
  const [char, setChar] = useState({});
  let { id } = useParams();
  // verificar logo que inicia a página singleChar se o char ta no favorito, pra por a estrela preenchida
  // COMO EU MELHORO ISSO????
  let favorites = [];
  
  localStorage.getItem("favorites")
    ? (favorites = JSON.parse(localStorage.getItem("favorites")))
    : (favorites = localStorage.getItem("favorites"));

  async function getData(id) {
    setChar(await getSingleChar(id));
  }

  useEffect(() => {
    getData(id);
  }, []);

  function goBack() {
    window.history.back();
  }

  function handleFavorite(e) {
    let btn;
    let favorites = [];

    if (e.target.parentNode.tagName === "BUTTON") {
      btn = e.target.parentNode;
    } else if (e.target.parentNode.tagName === "svg") {
      btn = e.target.parentNode.parentNode;
    } else {
      btn = e.target;
    }

    localStorage.getItem("favorites")
        ? (favorites = JSON.parse(localStorage.getItem("favorites")))
        : (favorites = localStorage.getItem("favorites"));

    // Se o id não está no array de favoritos, é porque, ao clicar, eu quero adicionar. Então, se temos isso, e também que já tem 10 personagens na lista, impedimos a adição.
    if (!favorites.includes(id) && favorites.length === 10) {
        alert("Número máximo de favoritos atingido.");
        return;
    }

    if (btn.classList.contains("favorited")) {
      btn.classList.remove("favorited");
      btn.classList.add("not-favorited");
    } else {
      btn.classList.add("favorited");
      btn.classList.remove("not-favorited");
    }

    console.log(favorites);

    if (!favorites.includes(id)) {
      const newFavorites = [...favorites, id];
      localStorage.setItem("favorites", JSON.stringify(newFavorites));

      console.log(localStorage.getItem("favorites"));
    } else if (favorites.includes(id)) {
      const newFavorites = favorites.filter((favId) => favId !== id);
      localStorage.setItem("favorites", JSON.stringify(newFavorites));

      console.log(localStorage.getItem("favorites"));
    }
  }

  return (
    <div className="container">
      {Object.keys(char).length > 0 ? (
        <div className="singleCharContainer" key={char.id}>
          <img src={char.image} alt={`Imagem do personagem ${char.name}.`} />
          <div className="charInfo">
            <div className="info">
              <p>Nome: {char.name}</p>
              <p>Espécie: {char.species}</p>
              {char.gender && <p>Gênero: {char.gender}</p>}
              <p>Origem: {char.origin.name}</p>
              <p>Local: {char.location.name}</p>
              <div className="buttonsContainer">
                <button
                  className="goBackButton"
                  title="Voltar"
                  onClick={goBack}
                >
                  <BsFillArrowLeftCircleFill />
                </button>
                <button
                  className={
                    favorites.includes(id)
                      ? "favoriteButton favorited"
                      : "favoriteButton not-favorited"
                  }
                  title="Favoritar"
                  onClick={handleFavorite}
                >
                  <AiOutlineStar />
                  <AiFillStar />
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : (<p className="text-2">Carregando...</p>)}
    </div>
  );
}

export default SingleChar;
