import React, {useEffect} from 'react';
import {Map, Marker} from "pigeon-maps";
import Anchor from "./Anchor.js";


function CallMap({info, selectedInfo, click}){

    let VPWidth = window.innerWidth;
    let VPHeight = window.innerHeight;

    //assign info[0] to selected info on first render, and everytime a new entry
    //is added tro infoList (when info.length changes). Makes ExtraInfo appear
    //when a new entry is added.

    useEffect(() => {

      click(info[0]);

    }, [info.length]);

    //draw the world map with markers for every searched callsign.
    //https://pigeon-maps.js.org/
  
    let mapCenter = [0, 0];

    //change the center of the map when a new callsign is entered
    //use anchor to first array element because array was reveresed in index.js


    if (info.length > 0) {

      mapCenter = info[0].anchor;
  
    }

    //find map center based on the selected anchor or table row.
    if ((selectedInfo)) {
        const findCenter = info.find( (a) => a.id === selectedInfo.id ) || [];
        mapCenter = findCenter.anchor;
        if (VPWidth < 420) mapCenter = [mapCenter[0] - 10, mapCenter[1] + 20];
        if (VPHeight < 570) mapCenter = [mapCenter[0] - 3, mapCenter[1] + 50];
    }

    //***************************************************************************************
    //had a useEffect() function here, but it wasn't necessary, because component already renders
    //when a prop is changed.


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

//  <Marker width={40} anchor={mapCoord.anchor} key={mapCoord.id}>
//  <Anchor info={mapCoord} selectedInfo={selectedInfo} action={click}/>
//</Marker>