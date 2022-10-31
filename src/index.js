import React, { useEffect, useState} from 'react';
import ReactDOM from 'react-dom/client';
import useFetch from "./useFetch.js";
import InfoBar from "./components/InfoBar.js";
import CallMap from "./components/CallMap.js";
import PopUp from "./components/PopUp.js";
import logo from "./assets/hl-logo.svg";
import './index.css';

function validateEntry(entry, currentList){

  let result = false;

  if (currentList.find((c) => entry.id === c.id) !== undefined) result = true;

  return result;
}


function Location(){
                                                // hook to change state when...
  const [callSign, setCallSign] = useState(""); // a callsign is entered
  const [infoList, setInfoList] = useState([]); // station information is retrieved
  const [callSignValue, setCallSignValue] = useState(""); //sets the value in the callsign field
  const [extraInfo, setExtraInfo] = useState(); //handles the information from useFetch() for the ExtraInfo component
  const [question, setQuestion] = useState();
  const [id, setId] = useState(1); //assigns an id number to the latest entered callsign (id will be infoList - 1)

  const jsonResp = useFetch(callSign); //fetch station information from callsign


  useEffect( () => {

    //make sure an entry with jsonResp.id doesn't already exist.
    if (validateEntry(jsonResp, infoList)) {
      alert("An error occured. Please try again.");
    } else {
      // add new retrieved station info to an array of previously retrieived data
        if((jsonResp.anchor) && (callSign !== "")) {

        //increment id by 1 for next entry.
        //removed global variable i from useFetch()
        setId(id + 1);
        
        setInfoList( (previousInfo) => {

          let newData = [Object.assign({call: callSign, id: id},  jsonResp), ...previousInfo];

          localStorage.setItem("list", JSON.stringify(newData));

          return newData;
        } );
      }
    }

  }, [jsonResp]); //call useEffect() if jsonResp changes (station info is retrieved)


  //Check if the "list" array is located in localStorage on first render.
  //check if the "list" array still exists when the question hook changes
  useEffect(() => {

    const storedData = JSON.parse(localStorage.getItem("list") || "[]" );

    //initialize id and infoList with locally stored data from previous sessions    
    if (storedData.length !== 0){

      setId(storedData.length + 1);
      setInfoList(storedData);

    } else {
      //if no previous data is found, initialize id and infoList with default values
      setId(1);
      setInfoList([]);
    }

  },[question]);
  

  return(
    <>
    <div className="title"> <img className="logo" src={logo} alt="" /> </div>
    <div className="main">
      {/* draw the world map containing markers for each station in infoList
          selectedId indicates a marker corresponding to a selected line in the 
          list of stations searched.*/}

      <div className="map" >
        <CallMap info={infoList} selectedInfo={extraInfo} click={setExtraInfo} />

        <div className="bottomBar">
        
        {/* Callsign input field with a submit button, and passes the entered value to setCallSign() */}
          <input className="callField" type="text" id="callSign" placeholder="Enter a Callsign" value={callSignValue} onChange={(e) => setCallSignValue(e.target.value)} onKeyPress={(e) => {
            if (e.key === "Enter"){
              setCallSign(e.target.value.toUpperCase());
              setCallSignValue("");
              setExtraInfo();
            }
          }} name="callSign" />

          <button onClick={() => {
            setCallSign(callSignValue.toUpperCase());
            setCallSignValue("");
            setExtraInfo();
          }} > Submit </button>
        </div>

      </div>

      {/* Creates a table with information of perviously searched stations, containing
          the station callsign, country, and lat/lng coordinates.*/}
      
      <InfoBar info={infoList} selectedInfo={extraInfo} click={setExtraInfo} />
      
      <PopUp value={question} set={setQuestion} count={infoList.length} />

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