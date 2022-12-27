/** @format */
import { useState } from "react";
import FocusTrap from "focus-trap-react";
import ValidateField from "./ValidateField.js";
import useFetch from "../useFetch.js";
import "./inputBar.css";
import "./home.css";

function Home({ setVis, setHome }) {
  const [homeCall, setHomeCall] = useState(
    JSON.parse(localStorage.getItem("home") || '{"call": ""}').call
  );
  const [unit, setUnit] = useState("metric");

  const [valid, setValid] = useState(true);
  const [warning, setWarning] = useState(true);

  const homeResp = useFetch(homeCall);

  const submit = () => {
    if (!valid) {
      setWarning(false);
      setValid(true);
    } else {
      const home = { call: homeCall, unit: unit, ...homeResp };

      localStorage.setItem("home", JSON.stringify(home));

      setHome(home);
      setVis(false);
    }
  };

  return (
    <FocusTrap>
      <div className="homeDialog">
        <div className="homeContent">
          <h3 className="homeTitle">Enter your home information...</h3>
          <div className="inputCont">
            <label>Callsign: </label>
            <ValidateField
              message="Enter your callsign."
              style="callField"
              valid={valid}
              setValid={setValid}
              warning={warning}
              setWarning={setWarning}
              value={homeCall}
              setValue={setHomeCall}
              initValue={
                JSON.parse(localStorage.getItem("home") || '{"call": ""}').call
              }
              type="Callsign"
            />
            {/*<span className="demo">* Enter "DEMO" for testing</span>*/}
          </div>

          <div className="inputCont">
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
          <div className="inputCont">
            <button className="submitButton" onClick={submit}>
              Submit
            </button>
          </div>
        </div>
      </div>
    </FocusTrap>
  );
}

export default Home;
