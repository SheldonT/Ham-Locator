import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./pages/Layout.js";
import About from "./pages/About.js";
import HowTo from "./pages/HowTo.js"
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