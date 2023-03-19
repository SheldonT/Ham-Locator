/** @format */

import ReactDOM from "react-dom/client";
import React, { useState, useEffect, useContext } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./pages/Layout.js";
import About from "./pages/About.js";
import HowTo from "./pages/HowTo.js";
import Stats from "./pages/Stats.js";
import Log from "./pages/Log.js";
import Location from "./components/Location.js";
import Login from "./pages/Login.js";

import Register from "./pages/Register.js";
import UserProvider, { UserContext } from "./contexts/UserContext.js";

import "./index.css";

function HamLocator() {
  const [fields, setFields] = useState(
    JSON.parse(localStorage.getItem("fields" || "{}"))
  );

  const [home, setHome] = useState(false);
  const [lines, setLines] = useState(false);

  const { isAuthenticated, authUserHome, setHomeDataFromDB } =
    useContext(UserContext);

  useEffect(() => {
    setHomeDataFromDB();
  }, [isAuthenticated]);

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/Ham-Locator/"
          element={
            <Layout
              optionalFields={fields}
              setOptionalFields={setFields}
              showHome={home}
              setHome={setHome}
              lines={lines}
              setLines={setLines}
            />
          }
        >
          <Route
            index
            element={
              isAuthenticated !== -1 ? (
                <Location optionalFields={fields} lines={lines} />
              ) : (
                <Login /> //login for now, but can be a landing page later, with a login option.
              )
            }
          />
          <Route path="login" element={<Login />} />
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
root.render(
  <UserProvider>
    <HamLocator />
  </UserProvider>
);
