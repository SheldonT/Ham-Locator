import { useEffect, useState} from 'react';
import Flag from "react-world-flags";
import {countryCode} from "../constants.js";
import "./stats.css";

function getCountry(data, currState){

    let countryArr = [];
    let countrySet;
    let code = [];

    for (let i = 0; i < data.length; i++){
        countryArr.push(data[i].country);
    }

    countrySet = new Set(countryArr);

    if (countrySet !== currState) {

        countrySet.forEach((val) => {

            const c = countryCode.find((a) => a.name === val);
            let count = 0;
    
            for (let i = 0; i < countryArr.length; i++){
                if (val === countryArr[i]) count = count + 1;
            }
    
            if (c) code.push({name: val, code: c.countryCode, count: count});
        });
    }

    return code;
}

function getBands(data){

    const bandDef = [
        {band: "2200m", low: 0.1357, high: 0.1378},
        {band: "160m", low: 1.8, high: 2},
        {band: "80m", low: 3.5, high: 4},
        {band: "40m", low: 7, high: 7.3},
        {band: "30m", low: 10.1, high: 10.15},
        {band: "20m", low: 14, high: 14.350},
        {band: "17m", low: 18.068, high: 18.168},
        {band: "15m", low: 21, high: 21.450},
        {band: "12m", low: 24.890, high: 24.990},
        {band: "10m", low: 28, high: 29.7},
        {band: "6m", low: 50, high: 54},
        {band: "2m", low: 144, high: 148},
        {band: "1.35m", low: 222, high: 225}, 
        {band: "70cm", low: 430, high: 450}
    ];

    const bandCount = [];

    for (let i = 0; i < bandDef.length; i++){

        let count = 0;

        for(let j = 0; j < data.length; j++){

            if ((parseFloat(data[j].freq) >= bandDef[i].low) && (parseFloat(data[j].freq) <= bandDef[i].high)) {
                count = count + 1;
            }
        }
        if (count != 0) {
            bandCount.push({band: bandDef[i].band, count: count});
        }
    }

    return bandCount;

}


function Stats() {

    const [listLen, setListLen] = useState(0);
    const [countries, setCountries] = useState([]);
    const [bands, setBands] = useState([]);

    let flagArr = [];
    let bandTableHead = [];
    let bandTable = [];

    useEffect(() => {

        const checkStoreChange = () => {
            const store = JSON.parse(localStorage.getItem("list") || "[]" );

            setListLen(store.length);
            setCountries( getCountry(store, countries) );

            setBands( getBands(store) );

        }

        checkStoreChange();

        window.addEventListener("storage", checkStoreChange);

        return () => window.removeEventListener("storage", checkStoreChange);


    }, []);

    console.log(bands);



    for (let i = 0; i < countries.length; i++){
        if (countries[i]) {

            flagArr.push(
                <div className="flagStatImg" key={i}><Flag code={countries[i].code} height={20} />
                    <div style={{paddingLeft: "1rem"}}>
                        {countries[i].name}: {countries[i].count}
                    </div>
                </div>
            );
        }
    }

    for (let i = 0; i < bands.length; i++){
        if (bands[i]) {

            bandTableHead.push(
                <th className="statHead" key={i}>{bands[i].band}</th>
            );
            bandTable.push(
                <td className="statCells" key={i}>{bands[i].count}</td>
            );
        }
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
                                    <th className="statHead">Total Contacts</th>
                                </tr>
                                <tr>
                                    <td className="statCells">{listLen}</td>
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
                                    <td className="statCells">{countries.length}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <div className="statCont">
                        <table className="statTable">
                            <tbody>
                                <tr>
                                    <th className="statHead">Contacts per Country</th>
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

            <div className="pageRow">
                <div className="statCont">
                    <table className="statTable">
                        <tbody>
                            <tr>
                                <th className="statHead" colSpan={bands.length} >Contacts per Band</th>
                            </tr>
                            <tr>
                                {bandTableHead}
                            </tr>
                            <tr>
                                {bandTable}
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