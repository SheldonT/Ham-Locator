import ReactDOM from 'react-dom/client';
import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./pages/Layout.js";
import About from "./pages/About.js";
import HowTo from "./pages/HowTo.js";
import Stats from "./pages/Stats.js";
import Location from "./components/Location.js";
import './index.css';

function HamLocator(){

  return(
    <BrowserRouter>
      <Routes>
        <Route path="/Ham-Locator/" element={<Layout />}>
          <Route index element={<Location />} />
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