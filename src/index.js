import React, { useEffect, useState, useRef} from 'react';
import ReactDOM from 'react-dom/client';
import {Map, Marker} from "pigeon-maps";
import useFetch from "./useFetch.js";
import InfoPointer from "./countryCode.js";
import './index.css';

let listener = false;

function CallMap({info, selectedId}){
  //draw the world map with markers for every searched callsign.
  //https://pigeon-maps.js.org/

  let mapCenter = [0, 0];

  //change the center of the map when a new callsign is entered
  if(info.length > 0) mapCenter = info[info.length - 1].anchor;

  //change map center when the mouse hovers over an entry in the info table
  if(selectedId !== undefined) {
    mapCenter = info.find((a) => a.id === selectedId).anchor;
  }
  
  return(
    <div className="map">
      <Map height={450} defaultCenter={[0, 0]} center={mapCenter} defaultZoom={3}>
        {info.map((mapCoord) =>
          <Marker width={40} anchor={mapCoord.anchor} id={selectedId}>
            <MapPin selId={selectedId} pinId={mapCoord.id} country={mapCoord.country} />
          </Marker>
        )}
      </Map>
    </div>
  );
}

function MapPin({selId, pinId, country}){
    //change the map marker to the flag of 'country' if the mouse cursor
    //is hovered over the TableRow with the same id as pinId

    if (selId === pinId){
      return(
        <InfoPointer name={country} />
      ); 
    } else {

      return(
        <>
        <Marker width={40}/>
        </>
    );
  }
}


function TableRow({info, action}){
  // create rows in the callsign information table
  return(
    <>
        <tr onMouseEnter={() => action(info.id) } onMouseLeave={ () => action() } id={info.id}>
          {/*Cells containing...*/}
          <td>{info.id /* ID # for the table row*/}</td>
          <td>{info.call /* station callsign*/}</td>
          <td>{info.country /* station country */}</td>
          <td>{info.anchor?.[0] /* station latitude */ }</td>
          <td>{info.anchor?.[1] /* station longitude */}</td>
        </tr>
    </>
  );
}


function InfoBar({info, action}){
    //create the table for searched callsigns containing station location information.
  return(
    <>
    <div className="infoBar">
      <table id="callList">
        <thead>
        <tr>
          <th> # </th>
          <th> Call Sign </th>
          <th> Country </th>
          <th> Latitude </th>
          <th> Longitude </th>
        </tr>
        </thead>
        <tbody>
          {/* create a row for each callsign searched (<TableRow>) */}
        {info.map( (callData) => <TableRow info={callData} action={action} />)}
      </tbody>
    </table>
  </div>
  </>
  );
}


function Location(){
                                                // hook to change state when...
  const [callSign, setCallSign] = useState(""); // a callsign is entered
  const [infoList, setInfoList] = useState([]); // station information is retrieved
  const [activeRow, setActiveRow] = useState(); // a specific table row is hovered over

  const jsonResp = useFetch(callSign); //fetch station information from callsign
  
  const fieldRef = useRef(null);

  useEffect( () => {
    // add new retrieved station info to an array of previously retrieived data
    if((jsonResp.anchor) && (callSign !== "")) {
      setInfoList( (previousInfo) => [...previousInfo, Object.assign({call: callSign}, jsonResp)]);
    }

    if ((fieldRef.current) && (listener === false)){

      fieldRef.current.addEventListener("keypress", (e) => {
        if (e.key === "Enter"){
          setCallSign(document.getElementById("callSign").value);
          document.getElementById("callSign").value = "";
        }
      });

      listener = true; //ensures keypress eventListener is only initialized once.
    }

  }, [jsonResp]); //call useEffect() if jsonResp changes (station info is retrieved)

  return(
    <>
      {/* draw the world map containing markers for each station in infoList
          selectedId indicates a marker corresponding to a selected line in the 
          list of stations searched.*/}
      <CallMap info={infoList} selectedId={activeRow} />

      {/* Creates a table with information of perviously searched stations, containing
          the station callsign, country, and lat/lng coordinates.*/}
      <InfoBar info={infoList} action={setActiveRow}/>

      {/* Callsign input field with a submit button, and passes the entered value to setCallSign() */}
      <div className="bottomBar">
        <input className="callField" type="text" id="callSign" placeholder="Enter a Callsign" name="callSign" ref={fieldRef}/>
        <button onClick={() => {
          setCallSign(document.getElementById("callSign").value);
          document.getElementById("callSign").value = "";
          }} > Submit </button>
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