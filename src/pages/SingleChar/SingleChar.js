import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { AiOutlineStar, AiFillStar } from "react-icons/ai";
import { BsFillArrowLeftCircleFill } from "react-icons/bs";
import "./styles.css";

import { getSingleCharInfo } from "../../services/api";
import { returnFavorites } from "../../utils/utils";
import { CharPage } from "../../utils/CharPage";

function SingleChar() {
  const [char, setChar] = useState({});
  const { id } = useParams();

  const favorites = returnFavorites();
  const configCharPage = { favorites, id };
  const charPage = CharPage(configCharPage);

  useEffect(() => {
    async function fetchData() {
      const charInfo = await getSingleCharInfo(id);

      setChar(charInfo);
    }
  
    fetchData();
  }, []);
  
  
  return (
    <div className="container">
      {Object.keys(char).length > 0
        ? (<div className="singleCharContainer" key={id}>
            <img src={char.image} alt={`Imagem do personagem ${char.name}.`} />
            <div className="charInfo">
              <div className="info">
                <p>Nome: {char.name}</p>
                <p>Staus: {char.status}</p>
                <p>Espécie: {char.species}</p>
                {char.gender && <p>Gênero: {char.gender}</p>}
                <p>Local: {char.location.name}</p>
                <p>Origem: {char.origin.name}</p>
                <div className="buttonsContainer">
                  <button
                    className="goBackButton"
                    title="Voltar"
                    onClick={charPage.goBack}
                  >
                    <BsFillArrowLeftCircleFill />
                  </button>
                  <button
                    className={
                      favorites.includes(id)
                        ? "favoriteButton favorited"
                        : "favoriteButton"
                    }
                    title="Favoritar"
                    onClick={charPage.handleFavoriting}
                  >
                    <AiOutlineStar />
                    <AiFillStar />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <p className="text-2">Carregando...</p>
        )}
    </div>
  );
}

export default SingleChar;
