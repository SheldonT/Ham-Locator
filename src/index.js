import React, { useEffect, useState, useRef } from 'react';
import ReactDOM from 'react-dom/client';
import {Map, Marker, Overlay} from "pigeon-maps";
import useFetch from "./useFetch.js";
import './index.css';

function CallMap({coord, selectedId}){

  return(
    <div className="map">
      <Map height={600} defaultCenter={[0, 0]} defaultZoom={3}>
        {coord.map((mapCoord) => 
          <Marker width={40} color={selectedId === mapCoord[2] ? "hsl(210deg 100% 50%)" : "hsl(280deg 100% 50%)" } anchor={mapCoord} id={selectedId} >
            <span>Test</span>
          </ Marker>
        )}
      </Map>
    </div>
  );
}

//<Marker width={40} color={selectedId === mapCoord[2] ? "hsl(210deg 100% 50%)" : "hsl(280deg 100% 50%)" } anchor={mapCoord} id={selectedId} />


function TableRow({info, action}){
  
  return(
    <>
        <tr onMouseEnter={() => action(info.id) } onMouseLeave={ () => action() } id={info.id}>
          <td>{info.anchor?.[2]}</td>
          <td>{info.call}</td>
          <td>{info.country}</td>
          <td>{info.anchor?.[0]}</td>
          <td>{info.anchor?.[1]}</td>
        </tr>
    </>
  );
}

//onMouseEnter={() => console.log(props.info.anchor?.[2])} onMouseLeave={() => console.log("Mouse Leave")}

function InfoBar({info, action}){

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
        {info.map( (callData) => <TableRow info={callData} action={action} />)}
      </tbody>
    </table>
  </div>
  </>
  );
}


function Location(){

  const [callSign, setCallSign] = useState("");
  const [anchorList, setAnchorList] = useState([]);
  const [infoList, setInfoList] = useState([]);
  const [activeRow, setActiveRow] = useState();

  const jsonResp = useFetch(callSign);

  useEffect( () => {
    if((jsonResp.anchor) && (callSign !== "")) {
      setAnchorList((previousAnchors) => [...previousAnchors, jsonResp.anchor]);
      setInfoList( (previousInfo) => [...previousInfo, Object.assign({call: callSign}, jsonResp)]);
    }

  }, [jsonResp]);

console.log(activeRow);

  return(
    <>
      <CallMap coord={anchorList} selectedId={activeRow} />
      <InfoBar info={infoList} action={setActiveRow}/>
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