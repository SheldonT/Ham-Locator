/** @format */

import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import menuImg from "../assets/hamburgerMenu.svg";
import menu from "./menu.module.css";
import PopUp from "./PopUp.js";

function Menu({ auth }) {
  const [openMenu, setOpenMenu] = useState(false);
  const [itemSelected, setItemSelected] = useState("");

  const nav = useNavigate();

  useEffect(() => {
    if (auth) {
      nav(itemSelected);
    } else {
      nav("login");
    }
  }, [itemSelected]);

  return (
    <div className={menu.menuBar}>
      <div
        className={menu.menuEl}
        onClick={() => {
          setItemSelected("/Ham-Locator/");
        }}
      >
        {" "}
        Home
      </div>
      <div
        className={menu.menuEl}
        onClick={() => {
          setItemSelected("log");
        }}
      >
        {" "}
        Full Log
      </div>
      <div
        className={menu.menuEl}
        onClick={() => {
          setItemSelected("stats");
        }}
      >
        {" "}
        Log Stats
      </div>
      <div
        className={menu.menuEl}
        onClick={() => {
          setItemSelected("instructions");
        }}
      >
        {" "}
        Instructions
      </div>
      <div
        className={menu.menuEl}
        onClick={() => {
          setItemSelected("about");
        }}
      >
        {" "}
        About
      </div>

      <div
        className={menu.hamburger}
        onClick={() => {
          setOpenMenu(!openMenu);
        }}
      >
        <img className={menu.menuImg} src={menuImg} />

        <PopUp styleCSS={menu.menu} show={openMenu}>
          <div
            className={menu.hMenuEl}
            onClick={() => {
              setItemSelected("/Ham-Locator");
            }}
          >
            Home
          </div>
          <div
            className={menu.hMenuEl}
            onClick={() => {
              setItemSelected("log");
            }}
          >
            Full Log
          </div>
          <div
            className={menu.hMenuEl}
            onClick={() => {
              setItemSelected("stats");
            }}
          >
            Log Stats
          </div>
          <div
            className={menu.hMenuEl}
            onClick={() => {
              setItemSelected("instructions");
            }}
          >
            Instructions
          </div>
          <div
            className={menu.hMenuEl}
            onClick={() => {
              setItemSelected("about");
            }}
          >
            About
          </div>
        </PopUp>
      </div>
    </div>
  );
}

export default Menu;
