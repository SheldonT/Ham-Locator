import React, { useEffect} from 'react';
import {Map, Marker} from "pigeon-maps";
import Anchor from "./Anchor.js";


function CallMap({info, selectedInfo, click}){

    let VPWidth = window.innerWidth;

    //draw the world map with markers for every searched callsign.
    //https://pigeon-maps.js.org/
  
    let mapCenter = [0, 0];

    //change the center of the map when a new callsign is entered
    //use anchor to first array element because array was reveresed in index.js.
    if(info.length > 0) {
      mapCenter = info[0].anchor;
    }
  

  
    //find map center based on the selected item from table.
    if(selectedInfo !== undefined) {

      mapCenter = info.find((a) => a.id === selectedInfo.id).anchor;
      
      if (VPWidth < 420) mapCenter = [mapCenter[0] - 10, mapCenter[1] + 20];

    }

    //called when a map marker is clicked
    useEffect(() => {

      VPWidth = window.innerWidth;

      //center the map on the selected marker
      if(selectedInfo)  {
        mapCenter = selectedInfo.anchor;

      }

    }, [selectedInfo]);
    
    return(
        <Map defaultCenter={[0, 0]} center={mapCenter} defaultZoom={3}>
            {info.map((mapCoord) =>
              <Marker width={40} anchor={mapCoord.anchor} key={mapCoord.id}>
                <Anchor info={mapCoord} selectedInfo={selectedInfo} action={click}/>
              </Marker>
            )}
        </Map>
    );
  }

  export default CallMap;