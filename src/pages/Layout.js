/** @format */

import { Outlet, Link } from "react-router-dom";
import logo from "../assets/hl-logo.svg";
import Menu from "../components/Menu.js";
import Home from "../components/Home.js";
import Settings from "../components/Settings.js";

function Layout({
  optionalFields,
  setOptionalFields,
  auth,
  showHome,
  setHome,
  setData,
  lines,
  setLines,
}) {
  return (
    <>
      <div className="title" id="title">
        <Link to="/Ham-Locator/">
          <img className="logo" src={logo} alt="" />{" "}
        </Link>

        <Menu auth={auth} />
        <Settings
          optionalFields={optionalFields}
          setOptionalFields={setOptionalFields}
          lines={lines}
          setLines={setLines}
          setHomeVis={setHome}
        />
      </div>

      <div className="main" id="main">
        {showHome ? <Home setVis={setHome} setHome={setData} /> : null}
        <Outlet />
      </div>
      <div className="footer">
        Version 1.1 made by{" "}
        <a href="https://twitter.com/Steegan" target="_blank" rel="noreferrer">
          SheldonT
        </a>{" "}
        (on{" "}
        <a href="https://github.com/SheldonT/Ham-Locator" target="_blank">
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
