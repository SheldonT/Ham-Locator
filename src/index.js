import React, { useEffect, useState} from 'react';
import ReactDOM from 'react-dom/client';
import useFetch from "./useFetch.js";
import InfoBar from "./components/InfoBar.js";
import CallMap from "./components/CallMap.js";
import logo from "./assets/hl-logo.svg";
import './index.css';

function validateEntry(entry, currentList){

  var result = false;

  if (currentList.find((c) => entry.id === c.id) !== undefined) result = true;

  return result;
}


function Location(){
                                                // hook to change state when...
  const [callSign, setCallSign] = useState(""); // a callsign is entered
  const [infoList, setInfoList] = useState([]); // station information is retrieved
  const [callSignValue, setCallSignValue] = useState("");
  const [extraInfo, setExtraInfo] = useState();

  const jsonResp = useFetch(callSign); //fetch station information from callsign


  useEffect( () => {

    //make sure an entry with jsonResp.id doesn't already exist.
    if (validateEntry(jsonResp, infoList)) {
      alert("An error occured. Please try again.");
    } else {
      // add new retrieved station info to an array of previously retrieived data
      if((jsonResp.anchor) && (callSign !== "")) {
       setInfoList( (previousInfo) => {

        let newData = [Object.assign({call: callSign}, jsonResp), ...previousInfo];

        localStorage.setItem("list", JSON.stringify(newData));

        return newData;
       } );


      }
    }

  }, [jsonResp]); //call useEffect() if jsonResp changes (station info is retrieved)


  useEffect(() => {
    
    setInfoList(JSON.parse(localStorage.getItem("list") || "[]" ));

  },[]);


  return(
    <>
    <div className="title"> <img className="logo" src={logo} alt="" /> </div>
    <div className="main">
      {/* draw the world map containing markers for each station in infoList
          selectedId indicates a marker corresponding to a selected line in the 
          list of stations searched.*/}

      <div className="map">
        <CallMap info={infoList} selectedInfo={extraInfo} click={setExtraInfo} />

        <div className="bottomBar">

          <input className="callField" type="text" id="callSign" placeholder="Enter a Callsign" value={callSignValue} onChange={(e) => setCallSignValue(e.target.value)} onKeyPress={(e) => {
            if (e.key === "Enter"){
              setCallSign(e.target.value.toUpperCase());
              setCallSignValue("");
            }
          }} name="callSign" />

          <button onClick={() => {
            setCallSign(callSignValue.toUpperCase());
            setCallSignValue("");
          }} > Submit </button>
        </div>

      </div>

      {/* Creates a table with information of perviously searched stations, containing
          the station callsign, country, and lat/lng coordinates.*/}
      <div className = "stationInfo">

        <div className="callInput">
          <InfoBar info={infoList} click={setExtraInfo} />

          {/* Callsign input field with a submit button, and passes the entered value to setCallSign() */}

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