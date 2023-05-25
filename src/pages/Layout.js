/** @format */

import { useContext, useEffect } from "react";
import { Outlet, Link, useNavigate } from "react-router-dom";
import logo from "../assets/hl-logo.svg";
import logout from "../assets/logoutIcon.svg";
import Menu from "../components/Menu.js";
import Home from "../components/Home.js";
import Settings from "../components/Settings.js";
import { UserContext } from "../contexts/UserContext.js";

function Layout({
  optionalFields,
  setOptionalFields,
  showHome,
  setHome,
  lines,
  setLines,
}) {
  const navigate = useNavigate();

  const { logoutUser, isAuthenticated } = useContext(UserContext);

  const logoutAction = () => {
    logoutUser();

    navigate("/login");
  };

  const handleBeforeUnload = (event) => {
    const demoFlag =
      JSON.parse(localStorage.getItem("sessionId")).demo || false;

    if (demoFlag) {
      // run your function here
      logoutUser();
      const message =
        "Guest user will now logout. Any logs will be deleted. Do you want to close the tab?";
      event.preventDefault(); // required to show a confirmation dialog
      event.returnValue = message;
    }
  };

  useEffect(() => {
    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  });

  return (
    <>
      <div className="title" id="title">
        <Link to="/">
          <img className="logo" src={logo} alt="" />{" "}
        </Link>
        <Menu />
        <div
          className="logoutBar"
          style={{ display: isAuthenticated !== "0" ? "flex" : "none" }}
        >
          <Settings
            optionalFields={optionalFields}
            setOptionalFields={setOptionalFields}
            lines={lines}
            setLines={setLines}
            setHomeVis={setHome}
          />
          <img
            className="logoutLogo"
            src={logout}
            alt="Logout"
            onClick={() => {
              logoutAction();
            }}
          />
        </div>
      </div>

      <div className="main" id="main">
        {showHome ? <Home setVis={setHome} /> : null}
        <Outlet />
      </div>
      <div className="footer">
        Version 1.1 made by{" "}
        <a href="https://twitter.com/Steegan" target="_blank" rel="noreferrer">
          SheldonT
        </a>{" "}
        (on{" "}
        <a
          href="https://github.com/SheldonT/Ham-Locator"
          target="_blank"
          rel="noreferrer"
        >
          GitHub
        </a>
        ). <br />
        DXCC search powered by{" "}
        <a href="https://www.hamqth.com/" target="_blank" rel="noreferrer">
          HamQTH.com
        </a>
        . <br />
      </div>
    </>
  );
}

export default Layout;
