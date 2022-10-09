import React, { useEffect, useState} from 'react';
import ReactDOM from 'react-dom/client';
import {Map, Marker} from "pigeon-maps";
import useFetch from "./useFetch.js";
import InfoPointer from "./countryCode.js";
import './index.css';

function CallMap({info, selectedId}){
  
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
  
  return(
    <>
        <tr onMouseEnter={() => action(info.id) } onMouseLeave={ () => action() } id={info.id}>
          <td>{info.id}</td>
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
  const [infoList, setInfoList] = useState([]);
  const [activeRow, setActiveRow] = useState();

  const jsonResp = useFetch(callSign);

  useEffect( () => {

    if((jsonResp.anchor) && (callSign !== "")) {
      setInfoList( (previousInfo) => [...previousInfo, Object.assign({call: callSign}, jsonResp)]);
    }

  }, [jsonResp]);

  console.log(infoList);

  return(
    <>
      <CallMap info={infoList} selectedId={activeRow} />

      <InfoBar info={infoList} action={setActiveRow}/>
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