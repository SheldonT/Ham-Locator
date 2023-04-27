/** @format */

import { useState, useEffect, useContext } from "react";
import { UserContext } from "../contexts/UserContext.js";
import axios from "axios";
import {
  VictoryBar,
  VictoryChart,
  VictoryAxis,
  VictoryTheme,
  VictoryLabel,
} from "victory";
import { countryCode, bandDef, SERVER_DOMAIN } from "../constants.js";
import "./stats.css";

function getCountry(data, currState) {
  let countryArr = [];
  let countrySet;
  let code = [];

  for (let i = 0; i < data.length; i++) {
    countryArr.push(data[i].country);
  }

  countrySet = new Set(countryArr);

  if (countrySet !== currState) {
    countrySet.forEach((val) => {
      const c = countryCode.find((a) => a.name === val);
      let count = 0;

      for (let i = 0; i < countryArr.length; i++) {
        if (val === countryArr[i]) count = count + 1;
      }

      if (c) code.push({ name: val, code: c.countryCode, count: count });
    });
  }

  return code;
}

function getBands(data) {
  const bandCount = [];

  for (let i = 0; i < bandDef.length; i++) {
    let count = 0;

    for (let j = 0; j < data.length; j++) {
      if (
        parseFloat(data[j].freq) >= bandDef[i].low &&
        parseFloat(data[j].freq) <= bandDef[i].high
      ) {
        count = count + 1;
      }
    }
    if (count !== 0) {
      bandCount.push({ band: bandDef[i].band, count: count });
    }
  }

  return bandCount;
}

function Stats() {
  const [listLen, setListLen] = useState(0);
  const [countries, setCountries] = useState([]);
  const [bands, setBands] = useState([]);

  const { isAuthenticated } = useContext(UserContext);

  const getLog = async () => {
    try {
      const response = await axios.get(`${SERVER_DOMAIN}logs`, {
        params: { id: isAuthenticated, decend: true },
      });

      setListLen(response.data.length);
      setCountries(getCountry(response.data, countries));
      setBands(getBands(response.data));
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getLog();
  }, []);

  return (
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
        </div>

        <div className="pageRow">
          <div className="statCont">
            <h3>Contacts per Country</h3>
            <VictoryChart
              width={450}
              padding={{ bottom: 100, right: 40, left: 40 }}
              domainPadding={30}
              theme={VictoryTheme.material}
            >
              <VictoryAxis
                tickLabelComponent={
                  <VictoryLabel angle={-60} textAnchor="end" />
                }
              />
              <VictoryAxis dependentAxis />
              <VictoryBar data={countries} x="name" y="count" />
            </VictoryChart>
          </div>
        </div>

        <div className="pageRow">
          <div className="statCont">
            <h3>Contacts per Band</h3>
            <VictoryChart
              width={450}
              domainPadding={30}
              theme={VictoryTheme.material}
            >
              <VictoryAxis />
              <VictoryAxis dependentAxis />
              <VictoryBar data={bands} x="band" y="count" />
            </VictoryChart>
          </div>
        </div>
      </div>
    </>
  );
}

export default Stats;

// const store = JSON.parse(localStorage.getItem("list") || "[]" );
