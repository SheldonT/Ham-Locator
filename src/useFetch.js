import { useState, useEffect } from "react";

let i = 0;

export default function useFetch(call){
    const [data, setData] = useState(null);
    //const defaultColor = "hsl(210deg 100% 50%)";
    

    useEffect (() => {
        const url = "/dxcc_json.php?callsign=" + call;

        if (call !== ""){
             
            i = i + 1;

            fetch(url).then((res) => res.json()).then((d) => {
                let rCountry = d.name;
                let rLatitude = d.lat;
                let rLongitude = d.lng;
            
                setData({
                    anchor: [parseFloat(rLatitude), parseFloat(rLongitude)],
                    id: i,
                    country: rCountry,
                });
        
            }).catch((e) => console.log(e));
        }

    }, [call]);

    return data || {}; //if data is null, return an empty string.

}