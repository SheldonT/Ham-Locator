import {countryCode} from "../constants.js";
import Flag from "react-world-flags";


function ExtraInfo({info}) {

    let code;
    let locDetails;
    let callSign;
    let time;
    let itu;

    if (info) {
        const countryInfo = countryCode.find( (c) => c.name === info.country);

        if (countryInfo) code = countryInfo.countryCode;
        //^^^^^^^^
        //add else statement to determine what happens if countryInfo is undefined.

        locDetails = info.details;
        callSign = info.call;
        time = <div className="extraDetails">Time Zone: {info.time} UTC </div>
        itu = <div className="extraDetails"> ITU Zone: {info.itu}</div>
    }

    return(
        <div className="markerInfo" >
            <div className="extraHeader">
                {callSign}
                <div className="flagIcon">
                    <Flag code={code} height={20}/>
                </div>
            </div>
            <div className="extraRow">
                <div className="extraDetails">{locDetails}</div>
            </div>
            
            <div className="extraRow">
                {time}
            </div>

            <div className="extraRow">
                {itu}
            </div>
            
        </div>
    );
}

export default ExtraInfo;