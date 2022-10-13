import { useState, useEffect } from "react";
import callsign from "callsign";
import {canPrefix, gps} from "./constants.js";
import areaCode from "./usPrefix";

let i = 0;

function countryCoord(country, prefix) {

    let cCoord = [];

    if (country === "Canada") {
        let c = canPrefix.find( (pre) => pre.prefix === prefix );
        cCoord = [parseFloat(c.latitude), parseFloat(c.longitude)];

    } else if (country === "United States"){

        let area = prefix.charAt(prefix.length - 1);
        const stateCode = areaCode.find( (s) => s.area === area);

        const state = gps.find( (s) => s.usa_state_code === stateCode.state );

        cCoord = [parseFloat(state.usa_state_latitude), parseFloat(state.usa_state_longitude)];

    } else {

        const countryInfo = gps.find((countryList) => countryList.country === country );
        cCoord = [parseFloat(countryInfo.latitude), parseFloat(countryInfo.longitude)];
    }

    return cCoord;
}

export default function useFetch(call){ //custom hook for retrieving station information from hamqth.com

    const [data, setData] = useState(null);
    

    useEffect (() => {
        const url = "dxcc_json.php?callsign=" + call;

        if (call !== ""){
             
            i = i + 1;

            fetch(url).then((res) => res.json()).then((d) => {
                let rCountry = d.name;
                let rLatitude = d.lat;
                let rLongitude = d.lng;
            
                setData({
                    anchor: [parseFloat(rLatitude), parseFloat(rLongitude)],
                    id: i,
                    country: rCountry
                });
        
            }).catch(() => {

                callsign.asyncGetAmateurRadioDetailedByCallsign(call)
                    .then((res) => {

                        let rCountry = res.areaname;
                        let rPrefix = res.prefix;
                        
                        let coord = countryCoord(rCountry, rPrefix);

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