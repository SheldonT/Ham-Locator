/** @format */

import ReactDOM from "react-dom/client";
import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import axios from "axios";
import Layout from "./pages/Layout.js";
import About from "./pages/About.js";
import HowTo from "./pages/HowTo.js";
import Stats from "./pages/Stats.js";
import Log from "./pages/Log.js";
import Location from "./components/Location.js";
import Login from "./pages/Login.js";
import Register from "./pages/Register.js";
import { SERVER_DOMAIN } from "./constants.js";
import "./index.css";

function HamLocator() {
  const [fields, setFields] = useState(
    JSON.parse(localStorage.getItem("fields" || "{}"))
  );

  const [isAuth, setIsAuth] = useState(
    JSON.parse(localStorage.getItem("authUser"))
      ? JSON.parse(localStorage.getItem("authUser")).authUser
      : -1
  );
  const [home, setHome] = useState(false);
  const [lines, setLines] = useState(false);

  const [homeData, setHomeData] = useState(
    JSON.parse(localStorage.getItem("home") || "{}")
  );

  const [homeFromDB, setHomeFromDB] = useState();

  if (!homeFromDB && isAuth !== -1) {
    axios
      .get(`${SERVER_DOMAIN}/users/getuser`, {
        params: { id: isAuth },
      })
      .then((response) => {
        if (response.status === 200) {
          setHomeFromDB(response.data);
        }
      })
      .catch((e) => console.log(e));
  }

  useEffect(() => {
    if (homeFromDB && isAuth !== -1) {
      const home = {
        anchor: [parseFloat(homeFromDB.lat), parseFloat(homeFromDB.lng)],
        call: homeFromDB.callsign,
        country: homeFromDB.country,
        gridloc: homeFromDB.gridloc,
        details: "",
        itu: homeFromDB.itu,
        utc: homeFromDB.utc,
        unit: homeFromDB.units,
      };

      setHomeData(home);
      localStorage.setItem("home", JSON.stringify(home));
    }
  }, [homeFromDB]);

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/Ham-Locator/"
          element={
            <Layout
              optionalFields={fields}
              setOptionalFields={setFields}
              auth={isAuth}
              showHome={home}
              setHome={setHome}
              setData={setHomeData}
              lines={lines}
              setLines={setLines}
            />
          }
        >
          <Route
            index
            element={
              isAuth !== -1 ? (
                <Location
                  optionalFields={fields}
                  homeData={homeData}
                  isAuth={isAuth}
                  lines={lines}
                />
              ) : (
                <Login setAuthUser={setIsAuth} /> //login for now, but can be a landing page later, with a login option.
              )
            }
          />
          <Route path="login" element={<Login setAuthUser={setIsAuth} />} />
          <Route path="register" element={<Register />} />
          <Route path="instructions" element={<HowTo />} />
          <Route path="about" element={<About />} />
          <Route path="stats" element={<Stats />} />
          <Route path="log" element={<Log optionalFields={fields} />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<HamLocator />);
