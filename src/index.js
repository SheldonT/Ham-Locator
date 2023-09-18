/** @format */

import ReactDOM from "react-dom/client";
import React, { useState, useEffect, useContext } from "react";
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
import UserProvider, { UserContext } from "./contexts/UserContext.js";
import LogProvider from "./contexts/LogContext.js";

import { SERVER_DOMAIN } from "./constants.js";

import "./index.css";

function HamLocator() {
  const [fields, setFields] = useState(
    JSON.parse(localStorage.getItem("fields" || "{}"))
  );

  const [home, setHome] = useState(false);
  const [lines, setLines] = useState(false);

  const { isAuthenticated, setHomeDataFromDB } = useContext(UserContext);

  useEffect(() => {
    if (!["-1", "0"].includes(isAuthenticated)) {
      setHomeDataFromDB();
    }
  }, [isAuthenticated]);

  const IndexRoute = () => {
    if (isAuthenticated !== "0" && isAuthenticated !== "-1") {
      return <Location optionalFields={fields} lines={lines} />;
    }

    return <Login />;
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
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
          <Route index element={<IndexRoute />} />
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
    <LogProvider>
      <HamLocator />
    </LogProvider>
  </UserProvider>
);
