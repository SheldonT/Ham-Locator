import {countryCode} from "../constants.js";
import Flag from "react-world-flags";


function ExtraInfo({info}) {

    let code;
    let locDetails;
    let callSign;
    let time;
    let itu;

    if (info) {
        code = countryCode.find( (c) => c.name === info.country).countryCode;
        locDetails = info.details;
        callSign = info.call;
        time = <tr> <td className="extraCells">Time Zone:</td> <td className="extraCells"> {info.time} UTC</td> </tr>
        itu = <tr> <td className="extraCells">ITU Zone:</td> <td className="extraCells"> {info.itu}</td> </tr>
    }

    return(
        <div className="markerInfo">
            <div className="extraHeader">{callSign}</div>
            <div className="extraRow">
                <div className="flagIcon">
                    <Flag code={code} height={20}/>
                </div>
                <div>{locDetails}</div>
            </div>
            
            <div className="extraRow">
                <table>
                    {time}
                    {itu}
                </table>
            </div>
            
        </div>
    )
}

export default ExtraInfo;