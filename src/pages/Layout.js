/** @format */

import { Outlet, Link } from "react-router-dom";
import logo from "../assets/hl-logo.svg";
import Menu from "../components/Menu.js";
import Home from "../components/Home.js";
import Settings from "../components/Settings.js";

function Layout({
  optionalFields,
  setOptionalFields,
  vis,
  setVis,
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
        <Menu />
        <Settings
          optionalFields={optionalFields}
          setOptionalFields={setOptionalFields}
          lines={lines}
          setLines={setLines}
          setHomeVis={setVis}
        />
      </div>

      <div className="main" id="main">
        {vis ? (
          <div className="homeBG">
            <Home setVis={setVis} setHome={setData} />
          </div>
        ) : null}
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

//<div className="menuEl"> <Link to="stats" target="_blank" state={infoList}>Log Stats</Link></div>
//<div className="menuEl" onClick={window.open("stats", "mozillaWindow", "popup")}> Log Stats </div>
