import React from 'react';
import ReactDOM from 'react-dom/client';
import { useState } from "react";
import './index.css';


function Location(){

  const [callSign, setCallSign] = useState(0);
  let obj;
 
    fetch('https://www.hamqth.com/dxcc.php?callsign=' + callSign, {mode: 'no-cors'})
    .then((response) => {response.text()})
    .then((text) => {console.log(text)})
    
  return(
    <div>
      <label htmlFor="callSign" >Callsign: </label> <input type="text" id="callSign" name="callSign" />
      <button onClick={() => setCallSign(document.getElementById("callSign").value)} > Submit </button>
    </div>
  );

}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  
      <Location />

);
//<React.StrictMode></React.StrictMode>