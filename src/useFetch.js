import { useState, useEffect } from "react";
import XMLParser from "react-xml-parser";
import callsign from "callsign";
import {canPrefix, gps, areaCode} from "./constants.js";

let i = 0;

function countryCoord(country, call, prefix) {

    const numberReg = /\d/;
    let cCoord = [];
    let area = "";

    if (country === "Canada") {
        let c = canPrefix.find( (pre) => pre.prefix === prefix );
        cCoord = [parseFloat(c.latitude), parseFloat(c.longitude)];

    } else if (country === "United States"){

//the prefix for some US callsigns is a single letter (apparently), and doesn't include the area code.
//for these callsigns, get the area code from the full call by getting the first number in the callsign.
//otherwise, proceed with getting the last character (area code) from the callsign prefix
        if((prefix.length === 1) && (prefix !== numberReg)) {
            area = call.match(numberReg)[0];
        } else {
            area = prefix.charAt(prefix.length - 1);
        }

//use the area code from the US callsign to get the state code for the station.
        const stateCode = areaCode.find( (s) => s.area === area);

//find the state gps coordinates using the state code.
        const state = gps.find( (s) => s.usa_state_code === stateCode.state );

        cCoord = [parseFloat(state.usa_state_latitude), parseFloat(state.usa_state_longitude)];

    } else {

        const countryInfo = gps.find((countryList) => countryList.country === country );
        cCoord = [parseFloat(countryInfo.latitude), parseFloat(countryInfo.longitude)];
    }

//return coordinates for the ham station's location.
    return cCoord;
}

export default function useFetch(call){ //custom hook for retrieving station information from hamqth.com

    const [data, setData] = useState(null);
    

    useEffect (() => {
        //const url = "https://www.hamqth.com/dxcc_json.php?callsign=" + call;
        const url = " https://www.hamqth.com/dxcc.php?callsign=" + call;

        if (call !== ""){
             
            i = i + 1;

            //fetch(url).then((res) => res.json()).then((d) => {
            fetch(url).then((res) => res.text()).then((d) => {

                const callData = new XMLParser().parseFromString(d);

                let rCountry = callData.getElementsByTagName("name")[0].value;
                let rLatitude = callData.getElementsByTagName("lat")[0].value;
                let rLongitude = callData.getElementsByTagName("lng")[0].value;
                
                console.log("Using hamQTH.com");

                setData({
                    anchor: [parseFloat(rLatitude), parseFloat(rLongitude)],
                    id: i,
                    country: rCountry
                });
        
            }).catch(() => {
                console.log("Using Alternative API")
                callsign.asyncGetAmateurRadioDetailedByCallsign(call)
                    .then((res) => {

                        let rCountry = res.areaname;
                        let rPrefix = res.prefix;
                        
                        let coord = countryCoord(rCountry, call, rPrefix);

                        setData({
                            anchor: coord,
                            id: i,
                            country: rCountry
                        });
                    });
            });
        }

    }, [call]);

    return data || {}; //if data is null, return an empty object.

}