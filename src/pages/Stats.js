import { useEffect, useState} from 'react';
import Flag from "react-world-flags";
import {countryCode} from "../constants.js";
import "./stats.css";

function Stats() {

    const [list, setList] = useState([]); 

    let countryArr = [];
    let countrySet;
    let code = [];
    let flagArr = [];

    useEffect(() => {

        const getCallData = () => {
            const store = JSON.parse(localStorage.getItem("list") || "[]" );
            if (store) setList(store);
        }

        getCallData();

        window.addEventListener("storage", getCallData);

        return () => window.removeEventListener("storage", getCallData);

    }, []);

    for (let i = 0; i < list.length; i++){
        countryArr.push(list[i].country);
    }

    countrySet = new Set(countryArr);

    countrySet.forEach((val) => {

        const c = countryCode.find((a) => a.name === val );
        let count = 0;


        for (let i = 0; i < countryArr.length; i++){
            if (val === countryArr[i]) count = count + 1;
        }

        if (c) code.push({name: val, code: c.countryCode, count: count});

    });

    for (let i = 0; i < code.length; i++){
        if (code[i]) flagArr.push(
            <div className="flagStatImg" key={i}><Flag code={code[i].code} height={20} />
                <div style={{paddingLeft: "1rem"}}>
                    {code[i].name}: {code[i].count}
                </div>
            </div>);
    }

    return(
        <>
            <h1>Log Stats</h1>
            <div className="statBar">

            <div className="pageRow">
            <div className="statCont">
            <table className="statTable">
                <tbody>
                    <tr>
                        <th className="statHead">Total Entries</th>
                    </tr>

                    <tr>
                        <td className="statCells">{list.length}</td>
                    </tr>
                </tbody>
            </table>
            </div>

            <div className="statCont">
            <table className="statTable">
                <tbody>
                    <tr>
                        <th className="statHead">Total Countries</th>
                    </tr>

                    <tr>
                        <td className="statCells">{countrySet.size}</td>
                    </tr>
                </tbody>
            </table>
            </div>
            </div>

            <div className="pageRow">
            <div className="statCont">
            <table className="statTable">
                <tbody>
                    <tr>
                        <th className="statHead">Callsigns per Country</th>
                    </tr>
                    <tr>
                        <td className="statCells">
                            {flagArr}
                        </td>
                    </tr>
                </tbody>
            </table>
            </div>
            </div>

            </div>
        </>
    );
}

export default Stats;

// const store = JSON.parse(localStorage.getItem("list") || "[]" );