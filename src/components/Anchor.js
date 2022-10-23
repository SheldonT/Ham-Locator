import {Marker} from "pigeon-maps";
import ExtraInfo from "./ExtraInfo.js";

function Anchor({info, selectedInfo, action}) {


    const active = "hsl(0, 100%, 45%)";
    const inActive = "hsl(204, 76%, 67%)";

    if ((selectedInfo) && (selectedInfo.id === info.id)){
        console.log("active");
        return(
            <>
                <Marker height={50} color={active} onClick={ () => action() } />
                <ExtraInfo info={selectedInfo} />
            </>);
    } else {
        console.log("inactive");
        return(
            <>
                <Marker height={40} color={inActive} onClick={ () => action(info) }/>
            </>
        );
    }

}

export default Anchor;