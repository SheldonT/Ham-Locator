/** @format */

import ReactDOM from "react-dom/client";
import React, { useContext, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./pages/Layout.js";
import About from "./pages/About.js";
import HowTo from "./pages/HowTo.js";
import Stats from "./pages/Stats.js";
import Log from "./pages/Log.js";
import Location from "./components/Location.js";
import "./index.css";
import UserProvider, { UserContext } from "./contexts/UserContext.js";

function HamLocator() {
  const [fields, setFields] = useState(
    JSON.parse(localStorage.getItem("fields" || "{}"))
  );
  const [home, setHome] = useState(false);
  const [lines, setLines] = useState(false);

  const [homeData, setHomeData] = useState(
    JSON.parse(localStorage.getItem("home") || "{}")
  );
  
  /* 
    useContext is the react hook that can reference the context created 
    here the [isAuthenticated] is being pulled from the UserContext

    the same can be done for functions defined in contexts
  */
  const { isAuthenticated } = useContext(UserContext);
  console.log({isAuthenticated})



  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/Ham-Locator/"
          //path="/"
          element={
            <Layout
              optionalFields={fields}
              setOptionalFields={setFields}
              vis={home}
              setVis={setHome}
              setData={setHomeData}
              lines={lines}
              setLines={setLines}
            />
          }
        >
          <Route
            index
            element={
              <Location
                optionalFields={fields}
                home={home}
                setHome={setHome}
                homeData={homeData}
                setHomeData={setHomeData}
                lines={lines}
              />
            }
          />
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
  <React.StrictMode>
    <UserProvider>
      <HamLocator />
    </UserProvider>
  </React.StrictMode>
);
