/** @format */
import { useState, useRef } from "react";
import FocusTrap from "focus-trap-react";
import ValidateField from "./ValidateField.js";
import Button from "./Button.js";
import useFetch from "../useFetch.js";
import home from "./home.module.css";

function Home({ setVis, setHome }) {
  const [homeCall, setHomeCall] = useState(
    JSON.parse(localStorage.getItem("home") || '{"call": ""}').call
  );
  const [unit, setUnit] = useState("metric");

  const [valid, setValid] = useState(true);
  const [warning, setWarning] = useState(true);

  const callField = useRef();

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

    callField.current.focus();
  };

  return (
    <FocusTrap>
      <div className={home.homeDialog}>
        <div className={home.homeContent}>
          <h3 className={home.homeTitle}>Enter your home information...</h3>
          <div className={home.inputCont}>
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
              refrence={callField}
            />
            {/*<span className="demo">* Enter "DEMO" for testing</span>*/}
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
        </div>
      </div>
    </FocusTrap>
  );
}

export default Home;
