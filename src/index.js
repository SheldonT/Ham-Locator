import React, { useEffect, useState} from 'react';
import ReactDOM from 'react-dom/client';
import useFetch from "./useFetch.js";
import InfoBar from "./components/InfoBar.js";
import CallMap from "./components/CallMap.js";
import ExtraInfo from "./components/ExtraInfo.js";
import logo from "./assets/hl-logo.svg";
import './index.css';

function getWinHeight(){
  const winHeight = window.innerHeight;
  let mapSize;

  if (winHeight < 420) {
    mapSize = 275;
  } else if ((winHeight < 800) && (winHeight >= 420)){
    mapSize = 350;
  } else {
    mapSize = 450;
  }
  
  return mapSize;
}


function Location(){
                                                // hook to change state when...
  const [callSign, setCallSign] = useState(""); // a callsign is entered
  const [infoList, setInfoList] = useState([]); // station information is retrieved
  const [activeRow, setActiveRow] = useState(); // a specific table row is hovered over
  const [callSignValue, setCallSignValue] = useState("");
  const [mapSize, setMapSize] = useState(getWinHeight);
  const [extraInfo, setExtraInfo] = useState();

  const jsonResp = useFetch(callSign); //fetch station information from callsign
  

  useEffect( () => {


    // add new retrieved station info to an array of previously retrieived data
    if((jsonResp.anchor) && (callSign !== "")) {
      setInfoList( (previousInfo) => [...previousInfo, Object.assign({call: callSign}, jsonResp)]);
    }


  }, [jsonResp]); //call useEffect() if jsonResp changes (station info is retrieved)

  
  window.addEventListener("resize", () => {
    const ms = window.innerHeight;

    setMapSize(getWinHeight);
   /* if (ms < 420) {
      setMapSize(250);
    } else {
      setMapSize(450);
    }*/
  });

  return(
    <>
    <div className="title"> <img className="logo" src={logo} alt="" /> </div>
    <div className="main">
      {/* draw the world map containing markers for each station in infoList
          selectedId indicates a marker corresponding to a selected line in the 
          list of stations searched.*/}
      <CallMap info={infoList} selectedId={activeRow} size={ mapSize } />

      {/* Creates a table with information of perviously searched stations, containing
          the station callsign, country, and lat/lng coordinates.*/}
      <div className = "stationInfo">

        <ExtraInfo info={extraInfo} />

        <div className="callInput">
          <InfoBar info={infoList} action={setActiveRow} click={setExtraInfo} />

          {/* Callsign input field with a submit button, and passes the entered value to setCallSign() */}
          <div className="bottomBar">

            <input className="callField" type="text" id="callSign" placeholder="Enter a Callsign" value={callSignValue} onChange={(e) => setCallSignValue(e.target.value)} onKeyPress={(e) => {
            if (e.key === "Enter"){
              setCallSign(e.target.value.toUpperCase());
              setCallSignValue("");
              setActiveRow();
            }
          }} name="callSign" />

            <button onClick={() => {
             setCallSign(callSignValue.toUpperCase());
             setCallSignValue("");
             setActiveRow();
              }} > Submit </button>
          </div>
        </div>
      </div>
    </div>
    <div className="footer">
        Version 1.1 made by <a href="https://twitter.com/Steegan" target="_blank">SheldonT</a> (on <a href="https://github.com/SheldonT/Ham-Locator" target="_blank">GitHub</a>). <br/>
        DXCC search powered by <a href="https://www.hamqth.com/" target="_blank">HamQTH.com</a>. <br />
    </div>
    </>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Location />
  </React.StrictMode>
);

//<label htmlFor="callSign" >Callsign:</label> 