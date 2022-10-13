import {Map, Marker} from "pigeon-maps";
import MapPin from "./MapPin.js";

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

  export default CallMap;