import { useState, useEffect } from "react";
import { BsArrowLeftCircle, BsArrowRightCircle } from "react-icons/bs";
import "./styles.css";

import { getChars } from "../../services/api";

function Home() {
  if (!localStorage.getItem("mode")) {
    localStorage.setItem("mode", "dark");
  }
  // se n existe a lista de favoritos no localstorage, então cria na inicialização da app, ou seja, aqui na home
  if (!localStorage.getItem("favorites")) {
    localStorage.setItem("favorites", "");
  }

  const [info, setInfo] = useState({});
  const [counter, setCounter] = useState(1);

  const totalPages = info.info ? info.info.pages : 0;
  const pagesAmount = 5;

  async function getData(page) {
    setInfo(await getChars(page));
  }

  useEffect(() => {
    getData(counter);
  }, []);

  function showCharPage(e) {
    const string = e.target.parentNode.id || e.target.id;
    const stringIntoArray = string.split("");
    const id = stringIntoArray.slice(1).join("");
    window.location.assign(`/character/${id}`);
  }

  function handleNext() {
    console.log(counter);
    if (counter === totalPages) {
      return;
    }
    const newCounter = counter + 1;
    setCounter(newCounter);
    getData(newCounter);
  }

  function handlePrevious() {
    if (counter === 1) {
      return;
    }
    const newCounter = counter - 1;
    setCounter(newCounter);
    getData(newCounter);
  }

  function goToPage(e) {
    setCounter(Number(e.target.textContent));
    getData(Number(e.target.textContent));
  }

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
        <button onClick={handlePrevious}>
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
                  onClick={goToPage}
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
          (button, index) => {
            setTimeout(() => {
              if (counter == button.textContent) {
                button.classList.add("current");
              } else {
                button.classList.remove("current");
              }
            }, 1);
          }
        )}

        <button onClick={handleNext}>
          <BsArrowRightCircle />
        </button>
      </div>
    </div>
  );
}

export default Home;
