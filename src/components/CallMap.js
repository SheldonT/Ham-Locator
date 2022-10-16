import {Map, Marker} from "pigeon-maps";


function CallMap({info, selectedId, size}){
    //draw the world map with markers for every searched callsign.
    //https://pigeon-maps.js.org/

    const active = "hsl(0, 100%, 45%)";
    const inActive = "hsl(204, 76%, 67%)";
  
    let mapCenter = [0, 0];
  
    //change the center of the map when a new callsign is entered
    if(info.length > 0) mapCenter = info[info.length - 1].anchor;
  
    //change map center when the mouse hovers over an entry in the info table
    if(selectedId !== undefined) {
      mapCenter = info.find((a) => a.id === selectedId).anchor;
    }
    
    return(
      <div className="map">
        <Map height={size} defaultCenter={[0, 0]} center={mapCenter} defaultZoom={3}>
          {info.map((mapCoord) =>
            <Marker width={(mapCoord.id === selectedId) ? 50 : 40} color={(mapCoord.id === selectedId) ? active : inActive} anchor={mapCoord.anchor} id={selectedId} />
          )}
        </Map>
      </div>
    );
  }

  export default CallMap;

  //<MapPin selId={selectedId} pinId={mapCoord.id} country={mapCoord.country} />
  //</Marker>