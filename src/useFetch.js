/** @format */

import { useState, useEffect } from "react";
import XMLParser from "react-xml-parser";
import callsign from "callsign";
import { canPrefix, gps, areaCode } from "./constants.js";

function countryCoord(country, call, prefix) {
  const numberReg = /\d/;
  let cCoord = [];
  let area = "";

  if (country === "Canada") {
    let c = canPrefix.find((pre) => pre.prefix === prefix);
    cCoord = [parseFloat(c.latitude), parseFloat(c.longitude)];
  } else if (country === "United States") {
    //the prefix for some US callsigns is a single letter (apparently), and doesn't include the area code.
    //for these callsigns, get the area code from the full call by getting the first number in the callsign.
    //otherwise, proceed with getting the last character (area code) from the callsign prefix
    if (prefix.length === 1 && prefix !== numberReg) {
      area = call.match(numberReg)[0];
    } else {
      area = prefix.charAt(prefix.length - 1);
    }

    const stateCode = areaCode.find((s) => s.area === area);

    const state = gps.find((s) => s.usa_state_code === stateCode.state);

    cCoord = [
      parseFloat(state.usa_state_latitude),
      parseFloat(state.usa_state_longitude),
    ];
  } else {
    const countryInfo = gps.find(
      (countryList) => countryList.country === country
    );
    cCoord = [
      parseFloat(countryInfo.latitude),
      parseFloat(countryInfo.longitude),
    ];
  }

  return cCoord;
}

export default function useFetch(call) {
  //custom hook for retrieving station information from hamqth.com

  const [data, setData] = useState(null);

  useEffect(() => {
    //const url = "https://www.hamqth.com/dxcc_json.php?callsign=" + call;
    const url = "https://www.hamqth.com/dxcc.php?callsign=" + call;

    if (call) {
      //fetch(url).then((res) => res.json()).then((d) => {
      fetch(url)
        .then((res) => res.text())
        .then((d) => {
          const callData = new XMLParser().parseFromString(d);

          let rCountry = callData.getElementsByTagName("name")[0].value;
          let rLatitude = callData.getElementsByTagName("lat")[0].value;
          let rLongitude = callData.getElementsByTagName("lng")[0].value;
          let rDetails = callData.getElementsByTagName("details")[0].value;
          let rTimeZone = callData.getElementsByTagName("utc")[0].value;
          let rITU = callData.getElementsByTagName("itu")[0].value;

          console.log("Using hamQTH.com");

          setData({
            anchor: [parseFloat(rLatitude), parseFloat(rLongitude)],
            country: rCountry,
            details: rDetails,
            time: rTimeZone,
            itu: rITU,
          });
        })
        .catch(() => {
          console.log("Using Alternative API");
          callsign
            .asyncGetAmateurRadioDetailedByCallsign(call)
            .then((res) => {
              let province = "";

              if (res.areaname === "Canada") {
                province =
                  canPrefix.find((i) => i.prefix === res.prefix).name + ", ";
              }

              let rCountry = res.areaname;
              let rDetails = province + res.areaname;
              let rPrefix = res.prefix;
              let rTimeZone = res.timezone;
              let rITU = res.ituzone;

              let coord = countryCoord(rCountry, call, rPrefix);

              setData({
                anchor: coord,
                country: rCountry,
                details: rDetails,
                time: rTimeZone,
                itu: rITU,
              });
            })
            .catch((e) =>
              alert(
                call +
                  " location information is not available at this time. Please try again later."
              )
            );
        });
    }
  }, [call]);

  return data || {};
}
