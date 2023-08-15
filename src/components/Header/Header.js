import React from "react";
import { BiSun, BiMoon } from "react-icons/bi";
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";
import "./styles.css";

function Header() {
  if (localStorage.getItem("mode") === "light") {
    document.body.classList.add("light");
  }

  function switchMode() {
    if (document.body.classList.contains("light")) {
        document.body.classList.remove("light");
        localStorage.setItem("mode", "dark");
      } else {
        document.body.classList.add("light");
        localStorage.setItem("mode", "light");
    }
  }

  function expandMenu() {
    document.body.classList.toggle("menu-expanded");
  }
  
  function handleRoute() {
    document.body.classList.remove("menu-expanded");
  }

  return (
    <header>
      <nav>
        <ul>
          <li>
            <a href="/" onClick={handleRoute}>Home</a>
          </li>
          <li>
            <a href="/favorites" onClick={handleRoute}>Favoritos</a>
          </li>
        </ul>
      </nav>
      <button id="switchButton" title="Alternar" onClick={switchMode}>
        <BiSun />
        <BiMoon />
      </button>
      <button id="menuButton" onClick={expandMenu}>
        <AiOutlineMenu />
        <AiOutlineClose />
      </button>
    </header>
  );
}

export default Header;
