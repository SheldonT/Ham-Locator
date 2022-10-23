import React, { useEffect, useState} from 'react';
import {Map, Marker} from "pigeon-maps";
import Anchor from "./Anchor.js";


function CallMap({info, selectedInfo, click}){

    const [anchorSelect, setAnchorSelect] = useState();

    //copy selectedInfo to showInfo, and only use showInfo for component rendering.
    //endures click() and setAnchorSelect() are manipulating the same object.

    let showInfo = selectedInfo;

    //draw the world map with markers for every searched callsign.
    //https://pigeon-maps.js.org/
  
    let mapCenter = [0, 0];
  
    //change the center of the map when a new callsign is entered
    if(info.length > 0) mapCenter = info[info.length - 1].anchor;
  
    //find map center based on the selected item from table.
    if(selectedInfo !== undefined) {
      mapCenter = info.find((a) => a.id === selectedInfo.id).anchor;
    }

    //called when a map marker is clicked
    useEffect(() => {

      //center the map on the selected marker
      if(anchorSelect)  mapCenter = anchorSelect.anchor;
      
      //update the selected marker information
      click(anchorSelect);

    }, [anchorSelect]);
    
    return(
        <Map defaultCenter={[0, 0]} center={mapCenter} defaultZoom={3}>
            {info.map((mapCoord) =>
              <Marker width={40} anchor={mapCoord.anchor} key={mapCoord.id}>
                
                <Anchor info={mapCoord} selectedInfo={showInfo} action={setAnchorSelect}/>
              </Marker>
            )}
        </Map>
    );
  }

  export default CallMap;