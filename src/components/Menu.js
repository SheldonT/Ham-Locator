/** @format */

import { useState } from "react";
import { Link } from "react-router-dom";
import menuImg from "../assets/hamburgerMenu.svg";
import menu from "./menu.module.css";
import PopUp from "./PopUp.js";

function Menu() {
  const [openMenu, setOpenMenu] = useState(false);

  return (
    <div className={menu.menuBar}>
      <div className={menu.menuEl}>
        {" "}
        <Link to="/Ham-Locator/">Home</Link>{" "}
      </div>
      <div className={menu.menuEl}>
        {" "}
        <Link to="log">Full Log</Link>{" "}
      </div>
      <div className={menu.menuEl}>
        {" "}
        <Link to="stats">Log Stats</Link>{" "}
      </div>
      <div className={menu.menuEl}>
        {" "}
        <Link to="instructions">Instructions</Link>{" "}
      </div>
      <div className={menu.menuEl}>
        {" "}
        <Link to="about">About</Link>{" "}
      </div>
      <div
        className={menu.hamburger}
        onClick={() => {
          setOpenMenu(!openMenu);
        }}
      >
        <img className={menu.menuImg} src={menuImg} />

        <PopUp styleCSS={menu.menu} show={openMenu}>
          <div className={menu.hMenuEl}>
            <Link to="/Ham-Locator/">Home</Link>{" "}
          </div>
          <div className={menu.hMenuEl}>
            <Link to="log">Full Log</Link>
          </div>
          <div className={menu.hMenuEl}>
            <Link to="stats">Log Stats</Link>
          </div>
          {/* target="_blank" causes a 404 issue */}
          <div className={menu.hMenuEl}>
            <Link to="instructions">Instructions</Link>{" "}
          </div>
          <div className={menu.hMenuEl}>
            <Link to="about">About</Link>{" "}
          </div>
        </PopUp>
      </div>
    </div>
  );
}

export default Menu;
