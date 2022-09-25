import React from 'react';
import ReactDOM from 'react-dom/client';
import {useState} from "react";
import {Map, Marker} from "pigeon-maps"
import useFetch from "./useFetch.js";
import './index.css';

function CallMap(props){

  console.log(props.coord);

  return(
    <div className="map">
      <Map height={600} defaultCenter={[0, 0]} defaultZoom={3}>
        <Marker width={40} anchor={props.coord} />
      </Map>
    </div>
  );
}

function InfoBar(props){

  return(
    <div className="infoBar">
      <table>
        <tbody>
          <tr className="tableColumn" >
            <th> Call Sign </th>
            <th> Country </th>
            <th> Latitude </th>
            <th> Longitude </th>
          </tr>
          <tr >
            <td>{props.callsign}</td>
            <td>{props.country}</td>
            <td>{props.lat}</td>
            <td>{props.lng}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

function Location(){

  const [callSign, setCallSign] = useState(0);

  const jsonResp = useFetch(callSign);
  let rCall = "";
  let rCountry = "";
  let rLatitude = "";
  let rLongitude = "";
  let anchor=[0, 0];

  if (jsonResp[0]){
    rCall = jsonResp[0].callsign;
    rCountry = jsonResp[0].name;
    rLatitude = jsonResp[0].lat;
    rLongitude = jsonResp[0].lng;
    anchor=[parseFloat(rLatitude), parseFloat(rLongitude)];
  }

  return(
    <>
      <CallMap coord={anchor} />
      <InfoBar callsign={rCall} country={rCountry} lat={rLatitude} lng={rLongitude} />
      <div className="bottomBar">
        <label htmlFor="callSign" >Callsign:</label> <input className="callField" type="text" id="callSign" name="callSign" />
        <button className="submit" onClick={() => setCallSign(document.getElementById("callSign").value)} > Submit </button>
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