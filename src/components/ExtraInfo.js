/** @format */

import { countryCode } from "../constants.js";
import Flag from "react-world-flags";
import { getDistance } from "geolib";
import "./extraInfo.css";

function ExtraInfo({ info, home }) {
  let code;
  let locDetails;
  let callSign;
  let time;
  let itu;
  let distance = "";

  if (info && home) {
    const countryInfo = countryCode.find((c) => c.name === info.country);

    if (countryInfo) code = countryInfo.countryCode;

    let dist = getDistance(
      { latitude: home.anchor[0], longitude: home.anchor[1] },
      { latitude: info.anchor[0], longitude: info.anchor[1] }
    );

    if (home.unit === "imperial") {
      dist = Math.round(dist * 0.000621371, 0);
    } else {
      dist = Math.round(dist / 1000, 1000);
    }

    locDetails = info.details;
    callSign = info.call;
    time = <div className="extraDetails">Time Zone: {info.time} UTC </div>;
    itu = <div className="extraDetails"> ITU Zone: {info.itu}</div>;
    distance = (
      <div className="extraDetails">
        Distance:{" "}
        {dist.toString().concat(home.unit === "imperial" ? " mi" : " km")}
      </div>
    );
  }

  return (
    <div className="markerInfo">
      <div className="extraHeader">
        {callSign}
        <div className="flagIcon">
          <Flag code={code} height={20} />
        </div>
      </div>
      <div className="extraRow">
        <div className="extraDetails">{locDetails}</div>
      </div>

      <div className="extraRow">{time}</div>

      <div className="extraRow">{itu}</div>
      <div className="extraRow">{distance}</div>
    </div>
  );
}

export default ExtraInfo;
