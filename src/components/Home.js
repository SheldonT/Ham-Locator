/** @format */
import { useState, useRef } from "react";
import FocusTrap from "focus-trap-react";
import TextField from "./TextField.js";
import Button from "./Button.js";
import { validateCall } from "../ValidateFunctions.js";
import useFetch from "../useFetch.js";
import home from "./home.module.css";

function Home({ setVis, setHome }) {
  const [homeCall, setHomeCall] = useState(
    JSON.parse(localStorage.getItem("home") || '{"call": ""}').call
  );
  const [unit, setUnit] = useState("metric");

  const [valid, setValid] = useState(true);
  const [warning, setWarning] = useState(false);

  const callField = useRef();

  const homeResp = useFetch(homeCall);

  const submit = () => {
    let home = {};

    if (!valid) {
      setWarning(true);
      callField.current.focus();
      return;
    }

    if (homeCall.toUpperCase() === "DEMO") {
      home = {
        call: "DEMO",
        unit: "imperial",
        country: "England",
        anchor: [51.53, -0.12],
        itu: "27",
        time: "0",
      };
    } else {
      home = { call: homeCall, unit: unit, ...homeResp };
    }

    localStorage.setItem("home", JSON.stringify(home));

    setHome(home);
    setVis(false);
  };

  return (
    <FocusTrap>
      <div className={home.homeBG}>
        <div className={home.homeDialog}>
          <div className={home.homeContent}>
            <h3 className={home.homeTitle}>Enter your home information...</h3>
            <div className={home.inputCont}>
              <label>Callsign: </label>

              <TextField
                //style={inputBar.callField}
                validate={validateCall}
                value={homeCall}
                setValue={setHomeCall}
                placeHolder="Callsign"
                refrence={callField}
                setValid={setValid}
                warning={warning}
                isValid={valid}
              />
              <span className={home.demo}>* Enter "DEMO" for testing</span>
            </div>

            <div className={home.inputCont}>
              <label>Units: </label>
              <input
                type="radio"
                id="metric"
                value="metric"
                name="units"
                defaultChecked
                onChange={(e) => setUnit(e.target.value)}
              />
              <label htmlFor="metric">Metric</label>
              <input
                type="radio"
                id="imperial"
                value="imperial"
                name="units"
                onChange={(e) => setUnit(e.target.value)}
              />
              <label htmlFor="metric">Imperial</label>
            </div>
            <div className={home.inputCont}>
              <Button name="Submit" clickEvent={submit} />
            </div>
            {homeCall.toUpperCase() === "DEMO" ? (
              <div className={home.inputCont}>
                <span className={home.note}>
                  For a list of callsigns for testing, go to the Loogbook tab on
                  my qrz.com page{" "}
                  <a href="https://www.qrz.com/db/VO1TWR" target="_blank">
                    here
                  </a>
                  .
                </span>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </FocusTrap>
  );
}

export default Home;
