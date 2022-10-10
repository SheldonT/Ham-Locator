import React, { useEffect, useState} from 'react';
import ReactDOM from 'react-dom/client';
import {Map, Marker} from "pigeon-maps";
import useFetch from "./useFetch.js";
import InfoPointer from "./countryCode.js";
import './index.css';

function CallMap({info, selectedId}){
  //draw the world map with markers for every searched callsign.
  //https://pigeon-maps.js.org/
  return(
    <div className="map">
      <Map height={500} defaultCenter={[0, 0]} defaultZoom={3}>
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

  useEffect( () => {
    // add new retrieved station info to an array of previously retrieived data
    if((jsonResp.anchor) && (callSign !== "")) {
      setInfoList( (previousInfo) => [...previousInfo, Object.assign({call: callSign}, jsonResp)]);
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
        <label htmlFor="callSign" >Callsign:</label> <input className="callField" type="text" id="callSign" name="callSign" />
        <button onClick={() => setCallSign(document.getElementById("callSign").value)} > Submit </button>
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