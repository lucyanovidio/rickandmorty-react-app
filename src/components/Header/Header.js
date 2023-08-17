import { BiSun, BiMoon } from "react-icons/bi";
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";
import "./styles.css";

import { Menu } from "../../utils/utils";

function Header() {
  const menu = Menu();

  if (localStorage.getItem("mode") === "light") {
    document.body.classList.add("light");
  }

  return (
    <header>
      <nav>
        <ul>
          <li>
            <a href="/" onClick={menu.closeMenu}>Home</a>
          </li>
          <li>
            <a href="/favorites" onClick={menu.closeMenu}>Favoritos</a>
          </li>
        </ul>
      </nav>
      <button id="switchButton" title="Alternar" onClick={menu.switchMode}>
        <BiSun />
        <BiMoon />
      </button>
      <button id="menuButton" onClick={menu.openMenu}>
        <AiOutlineMenu />
        <AiOutlineClose />
      </button>
    </header>
  );
}

export default Header;
