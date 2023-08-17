import { useState, useEffect } from "react";
import { BsArrowLeftCircle, BsArrowRightCircle } from "react-icons/bs";
import "./styles.css";

import { getPageInfo } from "../../services/api";
import { getApiData, showCharPage } from "../../utils/utils";
import { Page } from "../../utils/Page";

function Home() {
  const [info, setInfo] = useState({});
  const [counter, setCounter] = useState(1);

  const totalPages = info.info ? info.info.pages : 0;
  const pagesAmount = 5;
  
  const configPage = {
    counter, 
    setCounter,
    totalPages,
    getApiData,
    setInfo,
    getPageInfo
  };

  const page = Page(configPage);

  page.init();

  useEffect(() => {
    getApiData(setInfo, getPageInfo, counter);
  }, []);

  console.log(counter);

  return (
    <div className="container">
      <h1>Rick and Morty App</h1>

      {Object.keys(info).length > 0 ? (
        <ul className="chars-container">
          {info.results.map((char) => (
            <li
              className="char"
              key={char.id}
              id={"-" + char.id}
              onClick={showCharPage}
              title="Ver personagem"
            >
              <img
                src={char.image}
                alt={`Imagem do personagem ${char.name}.`}
              />
              <p>{char.name}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-2">Carregando...</p>
      )}

      <div className="buttonsContainer">
        <button onClick={page.previous}>
          <BsArrowLeftCircle />
        </button>

        <div className="pagesNums">
          {Object.keys(info).length > 0
            ? Array.from(Array(pagesAmount), (_, index) => (
                <button
                  key={counter + index}
                  className={
                    // Mantém estilo para página 1
                    counter === 1 ? "current" : ""
                  }
                  onClick={page.goTo}
                >
                  {counter >= totalPages - 2
                    ? totalPages - pagesAmount + 1 + index // chegar no primeiro da lista de botões pra depois somar os index e ficar certo
                    : counter <= 3
                    ? index + 1
                    : counter + index - 2}
                </button>
              ))
            : "..."}
        </div>

        {/* Aplicar estilo a página atual */}

        {Array.from(
          document.querySelectorAll(".pagesNums button"),
          (button, _) => {
            setTimeout(() => {
              if (counter == button.textContent) {
                button.classList.add("current");
              } else {
                button.classList.remove("current");
              }
            }, 1);
          }
        )}

        <button onClick={page.next}>
          <BsArrowRightCircle />
        </button>
      </div>
    </div>
  );
}

export default Home;
