import React, { useEffect, useState} from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./pages/Layout.js";
import About from "./pages/About.js";
import HowTo from "./pages/HowTo.js";
import Stats from "./pages/Stats.js";
import Location from "./components/Location.js";
import './index.css';

function HamLocator(){

  const [info, setInfo] = useState([]); //moved from Location to make info available to Stats

  
  return(
    <BrowserRouter>
      <Routes>
        <Route path="/Ham-Locator/" element={<Layout infoList={"test"} />}>
          <Route index element={<Location infoList={info} setInfoList={setInfo} />} />
          <Route path="instructions" element={<HowTo />} />
          <Route path="about" element={<About />} />
          <Route path="stats" element={<Stats />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <HamLocator />
  </React.StrictMode>
);