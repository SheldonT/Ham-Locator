/** @format */

import { countryCode } from "../constants.js";
import Flag from "react-world-flags";
import { getDistance } from "geolib";
import extraInfo from "./extraInfo.module.css";

function ExtraInfo({ info, home, infoStyle }) {
  let code;
  let locDetails;
  let callSign;
  let time;
  let itu;
  let distance = "";

  if (info) {
    const countryInfo = countryCode.find((c) => c.name === info.country);

    if (countryInfo) code = countryInfo.countryCode;

    locDetails = info.details;
    callSign = info.call;
    time = info.time ? (
      <div className={extraInfo.extraDetails}>Time Zone: {info.time} UTC </div>
    ) : null;
    itu = info.itu ? (
      <div className={extraInfo.extraDetails}> ITU Zone: {info.itu}</div>
    ) : null;
  }

  if (home && info) {
    let dist = getDistance(
      { latitude: home.anchor[0], longitude: home.anchor[1] },
      { latitude: info.anchor[0], longitude: info.anchor[1] }
    );

    if (home.unit === "imperial") {
      dist = Math.round(dist * 0.000621371, 0);
    } else {
      dist = Math.round(dist / 1000, 1000);
    }

    distance = (
      <div className={extraInfo.extraDetails}>
        Distance:{" "}
        {dist.toString().concat(home.unit === "imperial" ? " mi" : " km")}
      </div>
    );
  }

  return (
    <div className={extraInfo.markerInfo} style={infoStyle ? infoStyle : null}>
      <div className={extraInfo.extraHeader}>
        {callSign}
        <div className={extraInfo.flagIcon}>
          <Flag code={code} height={20} />
        </div>
      </div>
      {locDetails ? (
        <div className={extraInfo.extraRow}>
          <div className={extraInfo.extraDetails}>{locDetails}</div>
        </div>
      ) : null}
      {time ? <div className={extraInfo.extraRow}>{time}</div> : null}
      {itu ? <div className={extraInfo.extraRow}>{itu}</div> : null}
      {distance !== "" ? (
        <div className={extraInfo.extraRow}>{distance}</div>
      ) : null}
    </div>
  );
}

export default ExtraInfo;
