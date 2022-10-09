import { useState, useEffect } from "react";
import callsign from "callsign";
import gps from "./countryGPS.js"

let i = 0;

function countryCoord(country) {

    const countryInfo = gps.find((countryList) => countryList.country === country );

    const cCoord = [parseFloat(countryInfo.latitude), parseFloat(countryInfo.longitude)];

    return cCoord;
}

export default function useFetch(call){
    const [data, setData] = useState(null);
    

    useEffect (() => {
        const url = "xcc_json.php?callsign=" + call;

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
        
            }).catch((e) => {

                console.log(e);
                callsign.asyncGetAmateurRadioDetailedByCallsign(call)
                    .then((res) => {
                        let rCountry = res.areaname;
                        
                        let coord = countryCoord(rCountry);

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

//56.130366	-106.346771

//48.48	-55.47