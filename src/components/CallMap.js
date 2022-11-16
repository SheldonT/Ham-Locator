import React, {useEffect} from 'react';
import {Map, Marker} from "pigeon-maps";
import Anchor from "./Anchor.js";


function CallMap({info, selectedInfo, click}){

    let VPWidth = window.innerWidth;
    let VPHeight = window.innerHeight;

    //assign info[0] to selected info on first render, and everytime a new entry
    //is added to infoList (when info.length changes). Makes ExtraInfo appear
    //when a new entry is added.
    //   --click() only needs to run on first render and when info.length changes,
    //      not on every render, so a prop wasn't appropriate

    useEffect(() => {

      click(info[0]);

    }, [info.length]);
  
    let mapCenter = [0, 0];

    
    if ((info.length) > 0) {
      mapCenter = info[0].anchor;
    }

    if ((selectedInfo) && (info.length !== 0)){

        const findCenter = info.find( (a) => a.id === selectedInfo.id ) || [];
        
        mapCenter = findCenter.anchor;
        if (VPWidth < 420) mapCenter = [mapCenter[0] - 10, mapCenter[1] + 20];
        if (VPHeight < 570) mapCenter = [mapCenter[0] - 3, mapCenter[1] + 50];
    }

    return(
        <Map defaultCenter={[0, 0]} center={mapCenter} defaultZoom={3} >

            {info.map((mapCoord) =>
              
              <Marker width={40} anchor={mapCoord.anchor} key={mapCoord.id} >
                <Anchor info={mapCoord} selectedInfo={selectedInfo} action={click} />
              </Marker>

            )}

        </Map>
    );
  }

  export default CallMap;
