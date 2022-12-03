import {useEffect, useState} from 'react';
import { MapContainer, TileLayer, Popup} from 'react-leaflet';
import { NightRegion } from "react-leaflet-night-region"; //installed with --legacy-peer-deps
import ExtraInfo from "./ExtraInfo.js";

import Anchor from "./Anchor.js";

import "./callMap.css";


function CallMap({info, selectedInfo, click}){

    //assign info[0] to selected info on first render, and everytime a new entry
    //is added to infoList (when info.length changes). Makes ExtraInfo appear
    //when a new entry is added.
    //   --click() only needs to run on first render and when info.length changes,
    //      not on every render, so a prop wasn't appropriate

    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {

      click(info[0]);
      if (info.length === 0) {
        setIsOpen(false);
      } else {
        setIsOpen(true);
      }
      
    }, [info.length]);

  
    let mapCenter = [0, 0];

    let popUp = <></>;
    
    if ((info.length) > 0) {
      mapCenter = info[0].anchor;
    }


    if ((selectedInfo) && (info.length !== 0)){

        const findCenter = info.find( (a) => a.id === selectedInfo.id ) || [];
        
        mapCenter = findCenter.anchor;
    }

    if (isOpen) {
      popUp = <Popup position={selectedInfo ? selectedInfo.anchor : [0,0]} closeButton={false}>
                <ExtraInfo info={selectedInfo} />
              </Popup>
    } else {
      popUp = <></>
    }

    
    return(
      <MapContainer center={mapCenter} zoom={3} scrollWheelZoom={true}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
      />
      <NightRegion
        fillColor='#00345c'
        color='#001a2e'
        stroke={false}
      />
      {info.map((mapCoord) =>
              
        <Anchor info={mapCoord} selectedInfo={selectedInfo} action={click} setIsOpen={setIsOpen} key={mapCoord.id} />

      )}

      {popUp}
      </MapContainer>
    );

  }

  export default CallMap;
