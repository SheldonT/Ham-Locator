import InfoPointer from "./InfoPointer.js";
import {Marker} from "pigeon-maps";

function MapPin({selId, pinId, country}){
    //change the map marker to the flag of 'country' if the mouse cursor
    //is hovered over the TableRow with the same id as pinId

    if (selId === pinId){
      return(
        <>
            <InfoPointer name={country} />
        </>
      ); 
    } else {

      return(
        <>
            <Marker width={40}/>
        </>
    );
  }
}

export default MapPin;