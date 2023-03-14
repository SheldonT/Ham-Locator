/** @format */
import { useState, useContext } from "react";
import FocusTrap from "focus-trap-react";
import axios from "axios";
import TextField from "./TextField.js";
import Button from "./Button.js";
import useCallData from "../hooks/useCallData.js";
import home from "./home.module.css";
import { SERVER_DOMAIN } from "../constants.js";

function Home({ setVis, setHome }) {
  const homeData = JSON.parse(localStorage.getItem("home") || `{}`);

  const [callsign, setCallsign] = useState(homeData.call);
  const [email, setEmail] = useState("");
  const [gridloc, setGridloc] = useState("");

  const [unit, setUnit] = useState("metric");

  const homeResp = useCallData(callsign);

  const submit = () => {
    let home = {
      call: callsign.length !== 0 ? callsign.toUpperCase() : homeData.call,
      gridloc: gridloc.length !== 0 ? gridloc : homeData.gridloc,
      unit: unit.length !== 0 ? unit : homeData.unit,
      country: homeResp.country,
      anchor: homeResp.anchor,
      details: homeResp.details,
      itu: homeResp.itu,
      utc: homeResp.utc,
    };

    localStorage.setItem("home", JSON.stringify(home));
    setHome(home);

    let dbUpdate = {
      userId: JSON.parse(localStorage.getItem("authUser")).authUser,
      call: callsign.toUpperCase(),
      country: homeResp.country,
      lat: parseFloat(homeResp.anchor[0]),
      lng: parseFloat(homeResp.anchor[1]),
      gridloc: gridloc,
      itu: parseInt(homeResp.itu),
      utc: parseFloat(homeResp.utc),
    };

    if (email.length !== 0) dbUpdate = { email: email, ...dbUpdate };
    if (unit.length !== 0) dbUpdate = { units: unit, ...dbUpdate };

    console.log(callsign);

    axios
      .post(`${SERVER_DOMAIN}/users/edituser`, dbUpdate)
      .then((response) => {
        if (response.status === 200) {
          setVis(false);
        }
      })
      .catch((e) => console.log(e));
  };

  return (
    <FocusTrap>
      <div className={home.homeBG}>
        <div className={home.homeDialog}>
          <div className={home.homeContent}>
            <span className={home.homeTitle}>
              Enter your home information...
            </span>
            <div className={`${home.inputCont} ${home.inputAdapt}`}>
              <div className={home.textField}>
                {/*<label className={home.callLabel}>Callsign: </label>*/}
                <TextField
                  fieldContainerStyle={home.formFields}
                  value={callsign === undefined ? homeData.call : callsign}
                  setValue={setCallsign}
                  placeHolder="Callsign"
                  isValid={true}
                  keyDown={(e) => {
                    if (e.key === "Enter") {
                      submit();
                    }
                  }}
                />
                <TextField
                  fieldContainerStyle={home.formFields}
                  value={email}
                  setValue={setEmail}
                  placeHolder="E-Mail"
                  isValid={true}
                  keyDown={(e) => {
                    if (e.key === "Enter") {
                      submit();
                    }
                  }}
                />
                <TextField
                  fieldContainerStyle={home.formFields}
                  value={gridloc}
                  setValue={setGridloc}
                  placeHolder="Grid Locator"
                  isValid={true}
                  keyDown={(e) => {
                    if (e.key === "Enter") {
                      submit();
                    }
                  }}
                />
              </div>
              {/*<span className={home.demo}>* Enter "DEMO" for testing</span>*/}
            </div>

            <div className={`${home.inputCont} ${home.radioAdapt}`}>
              <label>Units: </label>
              <div className={home.radioButtonGroup}>
                <div className={home.radioButton}>
                  <input
                    type="radio"
                    id="metric"
                    value="metric"
                    name="units"
                    defaultChecked
                    onChange={(e) => setUnit(e.target.value)}
                  />
                  <label htmlFor="metric">Metric</label>
                </div>
                <div className={home.radioButton}>
                  <input
                    type="radio"
                    id="imperial"
                    value="imperial"
                    name="units"
                    onChange={(e) => setUnit(e.target.value)}
                  />
                  <label htmlFor="metric">Imperial</label>
                </div>
              </div>
            </div>
            <div className={home.inputCont}>
              <Button name="Submit" clickEvent={submit} />
            </div>
          </div>
        </div>
      </div>
    </FocusTrap>
  );
}

export default Home;
