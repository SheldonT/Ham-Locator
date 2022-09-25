import { useState, useEffect } from "react";

export default function useFetch(call){
    const [data, setData] = useState(null);

    useEffect (() => {
        const url = "/dxcc_json.php?callsign=" + call;
        if (call !== 0) fetch(url).then((res) => res.json()).then((d) => setData(d)).catch((e) => console.log(e));
    }, [call]);

    return [data];

}