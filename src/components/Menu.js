/** @format */

import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../contexts/UserContext.js";
import menuImg from "../assets/hamburgerMenu.svg";
import menu from "./menu.module.css";
import PopUp from "./PopUp.js";

function Menu() {
  const [openMenu, setOpenMenu] = useState(false);
  const [itemSelected, setItemSelected] = useState("");

  const nav = useNavigate();

  const { isAuthenticated } = useContext(UserContext);

  useEffect(() => {
    if (isAuthenticated !== "0") {
      nav(itemSelected);
    } else {
      setItemSelected("");
      nav("login");
    }
  }, [itemSelected, isAuthenticated]);

  return (
    <div
      className={menu.menuBar}
      style={{ display: isAuthenticated !== "0" ? "flex" : "none" }}
    >
      <div
        className={menu.menuEl}
        onClick={() => {
          setItemSelected("/");
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
