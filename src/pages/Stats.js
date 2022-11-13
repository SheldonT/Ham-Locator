import { useEffect, useState} from 'react';
import Flag from "react-world-flags";
import {countryCode, bandDef} from "../constants.js";
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